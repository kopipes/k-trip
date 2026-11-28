export const meeting = {
  date:'Minggu, 29 November 2026',
  time:'20.00 WIB',
  airport:'Bandara Soekarno–Hatta · Terminal 3',
  spot:'Depan counter Bakerzin / Fore'
};

export const tourLeader = { name:'Aris Ardhianto', phone:'+62 818-0843-8826' };

export const hotels = {
  sokcho:{ name:'Chungchoho Best Hotel', dates:'30 November · Hari 2', address:'28, Cheongchohoban-ro, 24885 Sokcho, Korea Selatan', phone:'+82 33-800-8555' },
  seoul:{ name:'Bridge Hotel', dates:'1–4 Desember · Hari 3–6', address:'9 Yeongdeungpo-ro, Yeongdeungpo District, Seoul, Korea Selatan', phone:'+82 2-2629-1300' }
};

export const days = [
  { date:'29 Nov', weekday:'Min', icon:'plane', title:'Jakarta → Incheon', subtitle:'Penerbangan malam menuju Korea', flight:['GA 878 · Garuda Indonesia','CGK 23.30 WIB → ICN 08.30 KST (+1)', '7 jam'], stops:[
    ['Bandara Soekarno–Hatta','Berkumpul pukul 20.00 WIB di Terminal 3, depan counter Bakerzin / Fore, untuk penerbangan langsung ke Incheon dengan Garuda Indonesia. Tiba keesokan paginya, Senin, 30 November, pukul 08.30 waktu Korea.']
  ] },
  { date:'30 Nov', weekday:'Sen', icon:'leaf', title:'Incheon → Pocheon → Nami → Mt. Sorak', subtitle:'Air terjun, ferry, dan suasana pegunungan', stops:[
    ['Incheon → Pocheon','Tiba pukul 08.30 waktu Korea, lalu berangkat dengan bus menuju kawasan Pocheon.', 'Bus bandara → Bidulginang Falls: sekitar 2–3 jam, di luar waktu imigrasi dan ambil bagasi.'],
    ['Bidulginang Falls','Air terjun di antara tebing batu vulkanik dengan suasana tenang. Ada kesempatan untuk berfoto di kawasan air terjun.'],
    ['Nami Island','Menyeberang dengan feri ke Nami Island. Pulau ini dikenal dengan jalan setapak di antara deretan pohon dan sering muncul di drama Korea.', 'Bus dari Bidulginang Falls ke dermaga Gapyeong: sekitar 1–1½ jam. Feri ke Nami: sekitar 5–10 menit, di luar antrean.'],
    ['Seoraksan National Park','Perjalanan dilanjutkan menuju kawasan Seoraksan untuk menikmati suasana pegunungan. Rombongan bermalam di Chungchoho Best Hotel, Sokcho.', 'Bus dari dermaga Gapyeong ke hotel di Sokcho: sekitar 2–3 jam.']
  ], hotel:'sokcho', transport:'Bus rombongan' },
  { date:'1 Des', weekday:'Sel', icon:'mountain', title:'Mt. Sorak → Seoul', subtitle:'Cable car, kelas kimbap, dan belanja', meal:true, stops:[
    ['Seoraksan National Park','Pagi hari, jelajahi taman nasional dan naik kereta gantung untuk melihat panorama pegunungan Seoraksan.'],
    ['Gwongeumseong Fortress','Kunjungan ke benteng di kawasan Seoraksan.'],
    ['Sinheungsa Temple','Kunjungi Sinheungsa Temple dan lihat patung Buddha besar yang menjadi salah satu ikon kawasan Seoraksan.'],
    ['Kelas membuat kimbap','Ikuti kegiatan membuat kimbap setelah rangkaian kunjungan di Seoraksan, dalam perjalanan menuju Seoul.', 'Bus kawasan Seoraksan → Seoul: sekitar 2½–4 jam waktu berkendara. Durasi kelas dan singgah dihitung terpisah.'],
    ['Cheonggyecheon Stream','Rute rombongan melewati Cheonggyecheon Stream, aliran sungai di tengah Seoul.'],
    ['Dongdaemun','Singgah untuk berbelanja di kawasan Dongdaemun sebelum bermalam di Seoul.']
  ], hotel:'seoul', transport:'Bus rombongan' },
  { date:'2 Des', weekday:'Rab', icon:'building', title:'Seoul · Hanok & Hongdae', subtitle:'Desa tradisional, COEX, dan Hongdae', meal:true, stops:[
    ['Ginseng & Cosmetic Shopping Tour','Rangkaian hari ini dimulai dengan tur belanja ginseng dan kosmetik Korea.'],
    ['Eunpyeong Hanok Village','Lihat rumah tradisional Korea (hanok) di Eunpyeong. Kawasan ini mempertemukan arsitektur tradisional dengan suasana kota modern di sekitarnya.'],
    ['Itaewon Mosque','Kunjungan ke masjid di Itaewon.', 'Bus dari Eunpyeong Hanok Village: sekitar 45–75 menit.'],
    ['COEX Mall & Starfield Library','Kunjungi pusat belanja COEX Mall, termasuk Starfield Library yang berada di dalam kompleksnya.', 'Bus dari Itaewon Mosque: sekitar 25–50 menit.'],
    ['Gangnam Style Statue','Singgah untuk berfoto di patung Gangnam Style.', 'Jalan kaki dari area Starfield Library: sekitar 5–15 menit.'],
    ['Hongdae','Malam hari, kunjungi Hongdae yang dikenal dengan suasana anak muda Seoul.', 'Bus dari COEX: sekitar 45–90 menit, tergantung lalu lintas sore atau malam.']
  ], hotel:'seoul', transport:'Bus rombongan' },
  { date:'3 Des', weekday:'Kam', icon:'camera', title:'Seoul · Hanbok & N Seoul Tower', subtitle:'Istana, panorama kota, dan Myeongdong', meal:true, stops:[
    ['Amethyst Showcase & Red Pine Tree Shop','Awali hari dengan tur belanja ke Amethyst Showcase dan Red Pine Tree Shop.'],
    ['Gyeongbokgung Palace','Coba mengenakan hanbok, pakaian tradisional Korea, saat berkunjung ke Gyeongbokgung Palace.'],
    ['Blue House','Melewati Blue House.'],
    ['N Seoul Tower','Nikmati panorama Seoul dari kawasan N Seoul Tower dan lihat area gembok cinta (love lock).', 'Dari kawasan Blue House ke area Namsan: sekitar 20–45 menit berkendara. Akses dari titik turun ke menara dihitung terpisah.'],
    ['Myeongdong & duty free','Tutup rangkaian hari dengan belanja di Myeongdong dan singgah di toko bebas bea (duty free).']
  ], hotel:'seoul', transport:'Bus rombongan' },
  { date:'4 Des', weekday:'Jum', icon:'heart', title:'Seoul · Hari bebas', subtitle:'Jelajahi Seoul sesuai rencanamu', meal:true, stops:[
    ['Seoul','Hari ini tidak ada bus rombongan atau pemandu. Kamu bebas mengatur rute sendiri, misalnya belanja, mampir ke beberapa kafe, atau mencari merchandise K-pop.']
  ], hotel:'seoul', transport:'Tanpa bus rombongan' },
  { date:'5 Des', weekday:'Sab', icon:'plane', title:'Seoul → Incheon → Jakarta', subtitle:'Penerbangan pulang ke Jakarta', meal:true, flight:['GA 879 · Garuda Indonesia','ICN 10.35 KST → CGK 16.00 WIB', '7 jam 25 menit'], stops:[
    ['Incheon International Airport','Berangkat dari Seoul menuju Incheon International Airport. Garuda GA 879 berangkat pukul 10.35 waktu Korea dan dijadwalkan tiba di Jakarta pukul 16.00 WIB.', 'Dari Bridge Hotel ke bandara: sekitar 50–90 menit berkendara, di luar waktu check-in dan pemeriksaan.'],
    ['Tiba di Jakarta','Tiba di Bandara Soekarno–Hatta pukul 16.00 WIB. Perjalanan tur berakhir di Jakarta.']
  ], details:['Jam berangkat dari hotel'] },
];

export const packing = [
  ['Dokumen & uang', [
    ['passport','Paspor'],['visa','Visa atau dokumen masuk yang berlaku'],['copies','Salinan dokumen perjalanan'],['ticket','Tiket dan itinerary'],['won','Uang tunai KRW dan kartu']
  ]],
  ['Pakaian & perlengkapan', [
    ['layers','Jaket hangat atau sweater'],['shoes','Sepatu jalan nyaman'],['umbrella','Payung lipat'],['skincare','Sunscreen, topi, dan lotion'],['toiletries','Sikat gigi, odol, dan toiletries'],['bidet','Bidet portabel (opsional)'],['meds','Obat pribadi dan resep bila perlu']
  ]],
  ['Kabin & koneksi', [
    ['spare','Satu set baju ganti di kabin jika koper terlambat'],['liquids','Cairan kabin dalam kantong transparan'],['valuables','Paspor, uang, dan barang berharga di tas kabin'],['charger','Charger dan adaptor bila perlu'],['power','Power bank sesuai ketentuan maskapai'],['internet','Roaming, eSIM, atau pocket Wi-Fi'],['tag','Kunci koper serta nama dan alamat pemilik di dalam koper']
  ]]
];

export const guide = [
  ['leaf','Cuaca & pakaian',[
    'Panduan Pergi.com memperkirakan suhu −2 hingga 12°C selama periode trip, dengan kemungkinan hujan sesekali. Cek prakiraan aktual menjelang berangkat.',
    'Siapkan pakaian hangat yang bisa dipakai berlapis, termasuk jaket atau sweater. Pilih sepatu nyaman dengan tumit rendah karena banyak berjalan.',
    'Bawa payung lipat untuk antisipasi hujan. Panduan juga menyarankan topi, sunscreen, serta losion tangan dan badan.'
  ]],
  ['clock','Zona waktu','Korea lebih cepat 2 jam dari WIB. Contohnya, pukul 10.00 WIB di Jakarta sama dengan pukul 12.00 KST di Seoul. Jam keberangkatan dan kedatangan di itinerary memakai waktu setempat masing-masing bandara.'],
  ['wallet','Uang & biaya pribadi',[
    'Mata uangnya won Korea (KRW). Pergi.com menyarankan menyiapkan won dari Indonesia. Kamu juga bisa membawa dolar AS dan menukarnya dengan kurs yang berlaku di Korea.',
    'Acuan panduan per 27 Oktober 2026: 1 KRW ≈ Rp13,66, 1 USD ≈ 1.322 KRW, dan 1 USD ≈ Rp18.062. Lihat tabel di atas untuk memperkirakan harga dalam rupiah.',
    'Laundry, telepon, minibar, dan tur tambahan menjadi biaya pribadi. Selesaikan tagihan hotel di kasir sebelum check-out.'
  ]],
  ['wallet','Pembayaran QRIS di Korea',[
    'Dukungan QRIS lintas negara untuk Korea perlu dicek di aplikasi bank atau dompet digital yang kamu gunakan. Pastikan Korea Selatan tercantum sebagai negara tujuan yang didukung. Daftar aplikasi dan merchant yang kompatibel belum terverifikasi di panduan ini.',
    'Kalau melihat logo SeoulPay atau ZeroPay di kasir, tanyakan apakah QR tersebut menerima pembayaran dari aplikasi Indonesia yang kamu pakai. Logo pembayaran lokal saja belum memastikan transaksi QRIS bisa dilakukan.',
    'Jika aplikasi dan merchant mendukung, pindai QR dari aplikasi pembayaranmu. Periksa nama toko, nominal won, nilai rupiah, kurs, dan biaya yang ditampilkan sebelum menyetujui transaksi.',
    'Tunjukkan status pembayaran berhasil kepada kasir dan simpan bukti transaksi. Jika saldo sudah terpotong tetapi kasir belum menerima konfirmasi, cek riwayat transaksi dan hubungi layanan pelanggan aplikasi sebelum mencoba membayar ulang.',
    'Siapkan juga won tunai atau kartu untuk merchant yang belum mendukung. Info umum QRIS dari Bank Indonesia tersedia di halaman Tautan.'
  ]],
  ['bag','Bagasi & kabin',[
    'Panduan mencantumkan jatah ekonomi Garuda sebesar 30 kg untuk bagasi tercatat dan satu tas kabin maksimal 7 kg, termasuk gagang dan roda. Cocokkan dengan tiket. Biaya kelebihan berat ditanggung peserta.',
    'Gunakan koper berkunci dan beroda. Empat roda disarankan. Simpan nama dan alamat pemilik di dalam koper.',
    'Simpan paspor, uang, dan barang berharga di tas kabin. Bawa juga satu set baju ganti untuk berjaga-jaga bila koper terlambat atau penerbangan tertunda atau batal. Masukkan barang kecil ke tas sebelum pemeriksaan keamanan.'
  ]],
  ['bolt','Cairan, power bank & barang terbatas',[
    'Untuk kabin, cairan dan gel maksimal 100 ml per kemasan. Masukkan semuanya ke satu kantong transparan yang bisa ditutup dengan kapasitas maksimal 1 liter.',
    'Panduan Pergi.com menyebut aerosol dilarang di kabin dan bagasi tercatat. Simpan benda tajam seperti pisau lipat, cutter, gunting kecil, gunting kuku, dan alat manikur tajam di luar tas kabin. Panduan juga melarang tas AirWheel dan tas dengan baterai tanam.',
    'Panduan menyebut power bank hanya boleh di kabin, dengan batas sekitar 20.000 mAh, serta dilarang digunakan atau diisi daya selama penerbangan. Cek ketentuan Garuda terbaru sebelum mengemas barang.'
  ]],
  ['heart','Makanan & obat',[
    'Makanan dari tur mengikuti jadwal operator. Label MP di itinerary berarti makan pagi.',
    'Pergi.com meminta peserta menghindari membawa produk pertanian dan peternakan, seperti daging, rendang, abon, susu, keju, buah, kacang, ikan teri atau ikan lainnya, serta sisa makanan dari pesawat. Cek ketentuan karantina Korea untuk barang bawaanmu.',
    'Bawa obat pribadi yang biasa kamu gunakan. Obat yang cocok belum tentu mudah ditemukan di Korea, dan beberapa obat membutuhkan resep. Bawa salinan resep bila perlu.'
  ]],
  ['globe','Internet & peta',[
    'Ponsel 4G/5G pada umumnya bisa dipakai di Korea. Kalau memilih roaming, hubungi operator seluler sebelum berangkat untuk mengaktifkannya. Pilihan lain adalah eSIM atau sewa pocket Wi-Fi.',
    'Simpan alamat hotel dari bagian Hotel trip untuk berjaga-jaga. Naver Map dan KakaoMap bisa membantu mencari rute jalan kaki, subway, dan bus.'
  ]],
  ['bolt','Listrik & hotel',[
    'Korea memakai listrik 220 V dengan colokan tipe C atau F. Keduanya memakai dua pin bulat. Cek colokan perangkat sebelum memutuskan membawa adaptor.',
    'Pergi.com menyebut kamar hotel di Korea bisa lebih kecil dan fasilitasnya lebih sederhana. Beberapa hotel mungkin tidak menyediakan pendingin ruangan.',
    'Bawa sikat gigi, pasta gigi, sisir, dan perlengkapan mandi yang biasa dipakai. Panduan juga menyarankan bidet portabel karena banyak toilet tidak memiliki bidet.'
  ]],
  ['building','Permintaan kamar','Kamar terhubung, bersebelahan, atau berhadapan, pilihan ranjang double atau twin, dan kamar merokok atau bebas rokok bergantung pada ketersediaan saat check-in, meski sudah diminta saat reservasi. Untuk ranjang tambahan, sampaikan permintaan jauh hari melalui operator. Ketersediaannya tetap dikonfirmasi saat check-in.'],
  ['shield','Keamanan & imigrasi',[
    'Hindari membawa perhiasan berlebihan dan jangan tinggalkan barang berharga di bus. Simpan paspor, uang, dan barang berharga di tas kabin.',
    'Siapkan salinan paspor dan dokumen perjalanan. Bawa satu set dan tinggalkan satu set di rumah agar mudah diakses jika dokumen hilang.',
    'Izin masuk diputuskan oleh petugas imigrasi saat tiba, termasuk bagi pemegang visa. Menurut ketentuan Pergi.com, peserta yang ditolak masuk harus kembali pada hari itu dengan biaya sendiri, dan biaya tur tidak dikembalikan.'
  ]],
  ['wallet','Tip tur','Pergi.com mencantumkan USD 70 per peserta sebagai panduan tip layanan lokal selama perjalanan ini.'],
  ['train','Transportasi saat hari bebas','Pada 4 Desember, peserta menjelajahi Seoul tanpa bus dan pemandu rombongan. Kalau menggunakan subway atau bus, pertimbangkan kartu T-money. Simpan rute kembali ke hotel dan cek jam keberangkatan terakhir.'],
  ['phone','Bantuan darurat','Di Korea, hubungi 112 untuk polisi, 119 untuk kebakaran atau ambulans, atau 1330 untuk bantuan wisata Korea Travel Hotline.']
];

export const links = [
  ['Peta & transportasi',[
    ['Naver Map','Rute jalan kaki, subway, dan bus','https://map.naver.com/','pin',{android:'https://play.google.com/store/apps/details?id=com.nhn.android.nmap',iphone:'https://apps.apple.com/app/id311867728'}],
    ['KakaoMap','Alternatif peta dan pencarian lokasi','https://map.kakao.com/','pin'],
    ['Papago','Terjemahan Korea, termasuk teks dari kamera','https://papago.naver.com/','globe',{android:'https://play.google.com/store/apps/details?id=com.naver.labs.translator',iphone:'https://apps.apple.com/app/id1147874819'}],
    ['Uber','Pesan kendaraan melalui aplikasi','https://www.uber.com/','train',{android:'https://play.google.com/store/apps/details?id=com.ubercab',iphone:'https://apps.apple.com/app/id368677368'}]
  ]],
  ['Info resmi & inspirasi',[
    ['QRIS · Bank Indonesia','Informasi resmi QRIS dan pembayaran lintas negara','https://www.bi.go.id/QRIS/default.aspx','wallet'],
    ['VISITKOREA','Panduan wisata resmi Korea','https://english.visitkorea.or.kr/','globe'],
    ['Korea Tourism Organization','Instagram resmi untuk inspirasi wisata','https://www.instagram.com/visitkorea_travel/','camera'],
    ['Garuda Indonesia','Informasi penerbangan dan ketentuan bagasi','https://www.garuda-indonesia.com/','plane'],
    ['Incheon Airport','Informasi terminal dan layanan bandara','https://www.airport.kr/','plane'],
    ['KBRI Seoul','Informasi dan layanan WNI di Korea','https://kemlu.go.id/seoul','shield']
  ]]
];
