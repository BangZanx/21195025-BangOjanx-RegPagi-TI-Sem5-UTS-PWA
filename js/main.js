document.addEventListener('contextmenu', event => event.preventDefault());

var domain = "http://127.0.0.1:5500/";
var c = document.querySelector('p[class="mt-2"]').textContent;

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: domain + "home.html",
        cache: false,
        processData: false,
        contentType: false,
        success: function(result) {
            $("#content").html(result);
        }
    });
});

$('a.home').bind('click', function(event) {
    $.ajax({
        type: 'GET',
        url: domain + "home.html",
        cache: false,
        processData: false,
        contentType: false,
        success: function(result) {
            $("#content").html(result);
        }
    });
});
$('a.about').bind('click', function(event) {
    $.ajax({
        type: 'GET',
        url: domain + "about.html",
        cache: false,
        processData: false,
        contentType: false,
        success: function(result) {
            $("#content").html(result);
        }
    });
});

$('a.skill').bind('click', function(event) {
    $.ajax({
        type: 'GET',
        url: domain + "skill.html",
        cache: false,
        processData: false,
        contentType: false,
        success: function(result) {
            $("#content").html(result);
        }
    });
});

$('a.contact').bind('click', function(event) {
    $.ajax({
        type: 'GET',
        url: domain + "contact.html",
        cache: false,
        processData: false,
        contentType: false,
        success: function(result) {
            $("#content").html(result);

            // Tangani pengiriman form ke database IndexedDB
document.querySelector('#contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.querySelector('#name').value;
    var comment = document.querySelector('#comment').value;

    // Buka database
    var request = indexedDB.open('MyDatabase', 1);

    request.onsuccess = function(event) {
        var db = event.target.result;

        // Mulai transaksi
        var transaction = db.transaction('contacts', 'readwrite');
        var contactStore = transaction.objectStore('contacts');

        // Tambahkan data ke toko data
        var newContact = { name: name, comment: comment };
        var addRequest = contactStore.add(newContact);

        addRequest.onsuccess = function() {
            console.log('Data added to database');
            alert('Terimakasih Atas Komentarnya');
            // Mungkin Anda ingin menampilkan pesan sukses atau melakukan tindakan lain di sini.
        };

        addRequest.onerror = function() {
            console.error('Error adding data to database:', addRequest.error);
            alert('Komen Anda Error');
        };
    };

    request.onerror = function(event) {
        console.error("Error opening database:", event.target.error);
    };
});
        }
    });
});

window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./sw.js');
    }
  }


  // Membuka atau membuat database IndexedDB
var request = indexedDB.open('MyDatabase', 1);

// Menangani event ketika database terbuka atau diperbarui
request.onupgradeneeded = function(event) {
    var db = event.target.result;

    // Buat objek toko data
    var contactStore = db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });

    // Buat indeks untuk pencarian
    contactStore.createIndex('name', 'name', { unique: false });
};

// Tangani kesalahan ketika membuka database
request.onerror = function(event) {
    console.error("Error opening database:", event.target.error);
};

// Tangani kesuksesan ketika database dibuka
request.onsuccess = function(event) {
    var db = event.target.result;
    console.log("Database opened successfully");

    // Lalu, Anda dapat menggunakan objek db untuk berinteraksi dengan database.
    // Anda dapat menambahkan, mengambil, atau menghapus data dari toko data 'contacts' di sini.
};