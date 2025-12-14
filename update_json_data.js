const fs = require('fs');
const path = require('path');

const rulesMap = {
    1: [ // Futsal
        "Setiap kelas yang mengikuti lomba maksimal 8 orang yang terdiri dari 5 pemain inti dan 3 pemain Cadangan",
        "Format permainan yaitu babak gugur",
        "Pertadingan dimainkan dengan waktu bermain 8 menit kali 2 babak dengan istirahat diantara babak 1 menit (injury time maks 30 detik)",
        "Apabila kedua tim memiliki 0 goal hingga akhir pertandingan,maka akan dilanjutkan ke babak penalti",
        "Penalti terdiri oleh 2 penendang,apabila masih seri maka akan dilakukan tos koin,penendang dan pemilih tos koin pertama sesuai yang main pertama",
        "Setiap pemain dilarang memakai aksesoris berlebihan yang dapat membahayakan saat pertandingan berlangsung",
        "Perlengkapan pemain ditanggung masing-masing",
        "Pemanggilan pemain dilakukan saat 2 menit sebelum pertandingan berakhir hingga 2 menit setelah pertandingan selesai,apabila tidak hadir maka dinyatakan gugur/didiskualifikasi",
        "Denda apabila terkena kartu: a. Kartu Kuning=Rp.10.000,00 b. Kartu Merah=Rp.15.000,00",
        "Setiap tim membawa uang jaminan sebesar Rp.50.000,00 untuk jaminan denda kartu,uang denda akan dipotong dari uang jaminan,uang akan dikembalikan setelah pertandingan berakhir dengan besar uang sesuai potongan denda/utuh",
        "Saling jaga rasa hormat kepada lawan,Kawan,wasit,maupun pihak yang terkait dan bermain dengan sportif",
        "Penonton dari setiap kelas harap kondusif dan respect kepada pemain di lapangan.",
        "Bila ada kegaduhan yang dilakukan oleh peserta/penonton,maka tim yang terlibat akan beresiko didiskualifikasi untuk pertandingan hari itu dan seri sportif kedepannya",
        "Segala keputusan yang berhubungan dengan penunjukan wasit tidak bisa diganggu gugat,hanya panitia pelaksana yang berkenan",
        "Keputusan wasit hanya bisa diganggu gugat oleh kapten setiap tim",
        "Apabila didiskualifikasi,uang pendaftaran tidak akan dikembalikan"
    ],
    2: [ // Mobile Legends
        "Pemain merupakan Siswa/i SMAN 18 GARUT",
        "Setiap pemain hanya boleh terdaftar dalam satu tim selama turnamen berlangsung.",
        "Turnamen terbuka untuk tim beranggotakan 5 pemain inti dan maksimal 2 pemain cadangan (total 7 anggota).",
        "Tim wajib mendaftarkan nama tim, dan (User ID) seluruh anggota.",
        "Tim wajib hadir di lobby yang ditentukan paling lambat 15 menit sebelum jadwal pertandingan.",
        "Maksimal penundaan pertandingan adalah 3 menit. Keterlambatan melebihi batas akan dianggap walkover.",
        "Pergantian pemain cadangan hanya dapat dilakukan diantara match dan wajib dilaporkan kepada panitia. Pergantian pemain harus disertai alasan yang jelas seperti sakit, dsb.",
        "**KODE ETIK DAN PERILAKU**",
        "1. Sportsmanship : Seluruh peserta wajib menjaga sportivitas. Hinaan, ujaran kebencian, perilaku toxic, atau kecurangan tidak akan ditoleransi.",
        "2. Dilarang Keras : Stream Sniping, account sharing, menggunakan pihak ketiga (hack/cheat), atau upaya manipulasi pertandingan (match fixing).",
        "3. Komunikasi : Semua komunikasi resmi dan pengaduan hanya melalui perwakilan tim (kapten) ke panitia.",
        "**PROSES PENGADUAN DAN SANKSI**",
        "1. Semua pengaduan harus disertai bukti otentik (screenshot/video/replay) dan diajukan maksimal 15 menit setelah pertandingan berakhir.",
        "2. Pelanggaran ringan: Teguran lisan/resmi atau pengurangan poin grup.",
        "3. Pelanggaran berat: Diskualifikasi dari pertandingan, seri, atau seluruh turnamen, serta kemungkinan larangan mengikuti event mendatang.",
        "4. Panitia berhak mengubah peraturan dengan pemberitahuan sebelumnya demi kelancaran turnamen.",
        "5. Keputusan panitia dan wasit adalah final.",
        "6. Peraturan ini berlaku sejak diumumkan dan wajib dipahami oleh seluruh peserta."
    ],
    3: [ // BOB
        "Perkelas dapat mengirimkan perwakilan minimal 2-3 orang, maksimal 5 orang",
        "Setiap peserta membawa alat tulis pulpen/pensil dan selembar kertas kosong",
        "Peserta harus mendengarkan arahan panitia/PJ",
        "Dilarang curang (bekerja sama dengan peserta yang lain ataupun dengan penonton)",
        "Diskusi dengan peserta lain di perbolehkan di babak kelompok saja"
    ],
    4: [ // Handball
        "1 kelas yang terdiri dari 7 pemain perempuan (termasuk penjaga gawang)",
        "durasi pertandingan 7 menit",
        "permainan fokus pada melempar, menangkap, serta mencetak gol dengan tangan",
        "Pemain tidak boleh menyentuh bola dengan kaki atau bagian bawah tubuh, dibatasi hanya boleh memegang bola selama 3 detik",
        "mengoper maksimal 3 langkah sambil membawa bola",
        "Pelanggaran seperti menyentuh bola di bawah lutut, mendorong, menarik, atau memukul lawan akan dikenakan sanksi."
    ],
    5: [ // Estafet Lari
        "Satu tim terdiri dari 4 pelari dengan urutan yang sudah ditentukan.",
        "Setiap pelari hanya boleh menempuh satu bagian lintasan.",
        "Tongkat estafet dibawa dengan tangan dan tidak boleh dilempar saat pergantian.",
        "Pergantian tongkat harus dilakukan di zona pergantian yang sudah ditandai.",
        "Tongkat jatuh membuat tim langsung didiskualifikasi.",
        "Pelari selanjutnya mulai bergerak saat pelari sebelumnya masuk zona pergantian.",
        "Semua peserta harus tetap di jalurnya dan tidak boleh menghalangi tim lain.",
        "Start hanya boleh dilakukan setelah aba-aba resmi dari panitia.",
        "Pelari terakhir wajib membawa tongkat sampai melewati garis finish.",
        "Tim menang jika mencapai garis finish paling cepat tanpa pelanggaran.",
        "Pergantian di luar zona, menghalangi lawan, atau keluar jalur bisa menyebabkan diskualifikasi."
    ],
    6: [ // Best Supporter
        "Supporter berada di lapangan selama kegiatan berlangsung.",
        "Dilarang menghina, mengejek, atau memprovokasi pemain lawan maupun Supporter lain.",
        "Dilarang melakukan tindakan yang dapat mengganggu kegiatan berlangsung.",
        "Dilarang melakukan tindakan yang dapat memicu keributan.",
        "Mematuhi dan menghormati keputusan wasit, pelatih, dan panitia.",
        "Bagi yang melanggar akan dikenakan pengurangan poin untuk “Best Supporter”."
    ]
};

const filePath = path.join(__dirname, 'src/data/sportif18.json');
const rawData = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(rawData);

if (data.competitions) {
    data.competitions.forEach(comp => {
        if (rulesMap[comp.id]) {
            comp.rules = rulesMap[comp.id];
        }
    });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('JSON file updated successfully.');
} else {
    console.log('No competitions found in JSON.');
}
