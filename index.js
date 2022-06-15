const express = require("express");
const app = express();
const port = 3001;
const superagent = require("superagent");
const {
  datapayment,
  datapaymentdone,
  datatransaksi,
  datamarketing,
  datauser,
  databusinessdev,
  datapartnership,
} = require("./models/index");
var sequelize = require("sequelize");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("TUGAS BESAR INTEGRASI DATA - DANA");
});

//endpoint 1 - Shopee ke Hasan - Step 1
app.post("/integrasi-data-payment", async (req, res) => {
  const dataShopee = await superagent.get(
    "https://shopee-iae.herokuapp.com/api/pembayaran"
  );

  let data = JSON.parse(dataShopee.text);

  for (i = 0; i < data.data.length; i++) {
    datapayment.create({
      id_pembayaran: data.data[i].id_pembayaran,
      nama_akun: data.data[i].nama_user,
      nomer_hp: data.data[i].no_hp,
      kategori: data.data[i].kategori_barang,
      total_harga: data.data[i].total_harga,
      nama_barang: data.data[i].nama_barang,
    });
  }

  res.send("data berhasil diintegrasi");
});

//endpoint 2 - Hasan ke Luthfi - Step 2
app.post("/integrasi-data-payment-done", async (req, res) => {
  let data = await datapayment.findAll({
    attributes: [
      "id_pembayaran",
      "nama_akun",
      "nomer_hp",
      "kategori",
      "total_harga",
      "nama_barang",
    ],
  });

  for (i = 0; i < data.length; i++) {
    datapaymentdone.create({
      // id_pembayaran_done: data.data[i].id_pembayaran,
      nama_akun: data[i].nama_akun,
      nomer_hp: data[i].nomer_hp,
      kategori: data[i].kategori,
      total_harga: data[i].total_harga,
      id_pembayaran: data[i].id_pembayaran,
      status: "done",
      kategori_barang: data[i].kategori,
      nama_barang: data[i].nama_barang,
    });
  }

  res.send("data berhasil diinput");
});

//endpoint 3 - Luthfi ke api-eai- Step 3
app.get("/get-all-payment-done", async (req, res) => {
  let data = await datapaymentdone.findAll({
    attributes: ["id_pembayaran", "status"],
  });

  res.json({
    data,
  });
});

//endpoint 4 - Luthfi ke Neta - Step 5
app.post("/integrasi-data-transaksi", async (req, res) => {
  //ngambil
  let data = await datapaymentdone.findAll({
    attributes: ["kategori", "total_harga", "nama_akun", "nomer_hp"],
  });

  //ngirim
  // dimulai dari 0, berhenti sebelum panjang data yaitu 9, dengan cara maju kedepan
  for (i = 0; i < data.length; i++) {
    datatransaksi.create({
      kategori: data[i].kategori,
      uang_keluar: data[i].total_harga,
      uang_masuk: 0,
      nama_user: data[i].nama_akun,
    });
  }

  res.send("berhasil dimasukan");
});

//endpoint 5 - Luthfi ke Dana - Step 6
app.post("/integrasi-data-marketing", async (req, res) => {
  //ngambil
  let data = await datapaymentdone.findAll({
    attributes: ["nama_barang", "kategori_barang"],
  });

  //ngirim
  for (i = 0; i < data.length; i++) {
    datamarketing.create({
      nama_barang: data[i].nama_barang,
      kategori_barang: data[i].kategori_barang,
    });
  }

  res.send("berhasil dimasukan");
});

//endpoint 6 - Neta ke Bagas - Step 7
app.post("/integrasi-data-user", async (req, res) => {
  //ngambil
  let data = await datatransaksi.findAll({
    attributes: ["uang_keluar"],
  });

  //ngirim
  for (i = 0; i < data.length; i++) {
    datauser.create({
      dana_shopee: data[i].uang_keluar,
    });
  }

  res.send("data berhasil dimasukan");
});

//endpoint 7 - Bagas mengambil data User di table Luthfi - Step 8
app.get("/get-data-user", async (req, res) => {
  let data = await datapaymentdone.findAll();

  res.send(data);
});

//endpoint 8 - Bagas memasukan data ke table User - Step 9
app.post("/integrasi-data-payment-user", async (req, res) => {
  //ngambil
  const data = await superagent.get(
    "https://eai-dana.herokuapp.com/get-data-user"
  );

  let dataParsed = JSON.parse(data.text);

  let id = 1;
  //ngeupdate
  for (i = 0; i < dataParsed.data.length; i++) {
    datauser.update(
      {
        nama_user: dataParsed.data[i].nama_akun,
        nomer_telepon: dataParsed.data[i].nomer_hp,
      },
      {
        where: {
          id_user: id,
        },
      }
    );
    id += 1;
  }

  res.send("Data berhasil di update");
});

//Endpoint 9 - Dana ke Silmy - Step 10
app.post("/integrasi-data-business-dev", async (req, res) => {
  //ngambil
  let data = await datamarketing.findAll({
    attributes: [
      [
        sequelize.fn("DISTINCT", sequelize.col("kategori_barang")),
        "kategori_barang",
      ],
    ],
  });

  // ngirim;
  for (i = 0; i < data.length; i++) {
    databusinessdev.create({
      kategori: data[i].kategori_barang,
    });
  }

  res.send("data berhasil dimasukan");
});

//endpoint 10 - Silmy ke Rizqan - Step 11
app.post("/integrasi-data-partnership", async (req, res) => {
  //ngambil
  let data = await databusinessdev.findAll({
    attributes: ["kategori"],
  });

  //ngirim
  for (i = 0; i < data.length; i++) {
    datapartnership.create({
      kategori_barang: data[i].kategori,
    });
  }

  res.send("data berhasil dimasukan");
});

//endpoint 11 - Rizqan input perusahaan dan nama partnership lalu update otomatis ke table silmy - Step 12
app.post("/input-partnership", (req, res) => {
  let payload = {
    nama: req.body.namaPartnership,
    perusahaan: req.body.namaPerusahaan,
    kategori: req.body.kategori,
  };

  datapartnership.update(
    {
      nama_partnership: payload.nama,
      perusahaan: payload.perusahaan,
    },
    {
      where: {
        kategori_barang: payload.kategori,
      },
    }
  );

  databusinessdev.update(
    {
      nama_partnership: payload.nama,
    },
    {
      where: {
        kategori: payload.kategori,
      },
    }
  );

  res.send("data berhasil dimasukan");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
