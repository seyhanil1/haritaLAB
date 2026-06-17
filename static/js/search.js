function haritayaAramaEkle(map, geojsonLayer, styleFonksiyonu, bilgiPaneliGuncellemeFonksiyonu) {
    // Leaflet Search kontrolünü tanımlıyoruz
    var searchControl = new L.Control.Search({
        layer: geojsonLayer,          // Arama yapılacak GeoJSON katmanı
        propertyName: 'name',         // GeoJSON içindeki şehir ismi alanı (Eğer json içinde 'il_adi' ise değiştirebiliriz)
        marker: false,                // Seçilen yere varsayılan ikon koymasın
        moveToLocation: function(latlng, title, map) {
            map.setView(latlng, 7);   // Şehre odaklanma zoom seviyesi (7 idealdir)
        }
    });

    // Bir şehir arandığında ve listeden seçildiğinde çalışacak olay
    searchControl.on('search:locationfound', function(e) {
        // 1. Seçilen şehrin adını al
        var secilenSehir = e.layer.feature.properties.name;
        
        // 2. Eğer ana kodlarında 'currentSelectedCity' değişkeni varsa onu güncelle
        if (typeof currentSelectedCity !== 'undefined') {
            currentSelectedCity = secilenSehir;
        }

        // 3. Haritadaki renkleri güncelle (Seçilen şehri kırmızı yapmak için)
        geojsonLayer.setStyle(styleFonksiyonu);
        
        // 4. Sağdaki bilgi panelini güncelleyen fonksiyonu tetikle
        bilgiPaneliGuncellemeFonksiyonu(secilenSehir);
    });

    // Oluşturulan arama kutusunu haritaya ekle
    map.addControl(searchControl);
}