// === Hitung Nilai dan Simpan Otomatis ===
function hitungNilai() {
  const tugas = parseFloat(document.getElementById("tugas").value);
  const uts = parseFloat(document.getElementById("uts").value);
  const uas = parseFloat(document.getElementById("uas").value);

  if (isNaN(tugas) || isNaN(uts) || isNaN(uas)) {
    alert("Harap isi semua nilai!");
    return;
  }

  const nilaiAkhir = (tugas * 0.3) + (uts * 0.3) + (uas * 0.4);
  let predikat = "";

  if (nilaiAkhir >= 85) predikat = "A (Sangat Baik)";
  else if (nilaiAkhir >= 75) predikat = "B (Baik)";
  else if (nilaiAkhir >= 65) predikat = "C (Cukup)";
  else predikat = "D (Perlu Perbaikan)";

  const hasilText = `
    Nilai Akhir: <b>${nilaiAkhir.toFixed(2)}</b><br>
    Predikat: <b>${predikat}</b>
  `;
  document.getElementById("hasil").innerHTML = hasilText;

  // Tampilkan tombol cetak
  document.getElementById("printButton").style.display = "block";

  // Simpan ke localStorage
  localStorage.setItem("nilaiData", JSON.stringify({
    tugas, uts, uas, nilaiAkhir, predikat
  }));
}

// === Cetak Nilai ===
function cetakNilai() {
  window.print();
}

// === Reset Data ===
function resetNilai() {
  localStorage.removeItem("nilaiData");
  document.getElementById("tugas").value = "";
  document.getElementById("uts").value = "";
  document.getElementById("uas").value = "";
  document.getElementById("hasil").innerText = "Masukkan nilai untuk melihat hasil.";
  document.getElementById("printButton").style.display = "none";
}

// === Muat Data Otomatis Saat Dibuka ===
window.onload = function () {
  const data = JSON.parse(localStorage.getItem("nilaiData"));
  if (data) {
    document.getElementById("tugas").value = data.tugas;
    document.getElementById("uts").value = data.uts;
    document.getElementById("uas").value = data.uas;
    document.getElementById("hasil").innerHTML = `
      Nilai Akhir: <b>${data.nilaiAkhir.toFixed(2)}</b><br>
      Predikat: <b>${data.predikat}</b>
    `;
    document.getElementById("printButton").style.display = "block";
  }
};

// === Mode Gelap ===
const toggleButton = document.getElementById("darkModeToggle");
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    toggleButton.textContent = "☀️ Mode Terang";
    localStorage.setItem("darkMode", "true");
  } else {
    toggleButton.textContent = "🌙 Mode Gelap";
    localStorage.setItem("darkMode", "false");
  }
});

// === Muat Mode Gelap Saat Dibuka ===
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  toggleButton.textContent = "☀️ Mode Terang";
}
