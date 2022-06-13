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
} = require("./models/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let data = [
  { nama: "luthfi", umur: 20 },
  { nama: "kamu", umur: 19 },
];

app.get("/", (req, res) => {
  res.send(data);
});

//endpoint 1
app.post("/integrasi-data-payment", async (req, res) => {
  const dataShopee = await superagent.get(
    "https://eai-shopee.herokuapp.com/get-data-shopee"
  );

  let data = JSON.parse(dataShopee.text);

  //   res.send(data);

  //   console.log(data.data[0].nama_produk);

  for (i = 0; i < data.data.length; i++) {
    datapayment.create({
      id_pembayaran: data.data[i].id_pembayaran,
      nama_akun: data.data[i].nama_user,
      nomer_hp: data.data[i].no_hp,
      kategori: data.data[i].Kategori_Produk,
      total_harga: data.data[i].total_bayar,
      nama_barang: data.data[i].nama_produk,
    });
  }

  res.send("data berhasil diinput");
});

//endpoint 2
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

//endpoint 3
app.get("/get-all-payment-done", async (req, res) => {
  let data = await datapaymentdone.findAll({
    attributes: ["id_pembayaran", "status"],
  });

  res.json({
    data,
  });
});

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
