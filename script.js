import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Translations and language selector
const translations = {
    en: {
        route_map_link: "🗺️ Route Map",
        delhi_bus_map_title: "Delhi Bus Route Map",
        chat_btn: "💬 Chat",
        main_title: "🚏 SmartTransit",
        main_subtitle: "Real-time Public Transport Tracking & Smart ETA Prediction. Making urban mobility smarter, faster, and more reliable.",
        explore_app_btn: "Explore the App",
        live_map_title: "📍 Live Map with Vehicles & Bus Stops",
        refresh_location_btn: "Refresh My Location",
        where_is_my_bus_title: "🔍 Where is my Bus?",
        by_route_tab: "By Route",
        by_bus_number_tab: "By Bus Number",
        from_label: "From",
        from_placeholder: "e.g., Mori Gate",
        to_label: "To",
        to_placeholder: "e.g., Ambedkar Nagar",
        find_buses_btn: "Find Buses",
        bus_number_label: "Bus Number",
        bus_number_placeholder: "e.g., 411",
        track_bus_btn: "Track Bus",
        recent_searches_title: "Recent Searches",
        search_history_placeholder: "Your search history will appear here.",
        predictive_eta_title: "🧠 Predictive ETA",
        start_location_label: "Start Location:",
        destination_label: "Destination:",
        to_kashmere_placeholder: "e.g., Mehrauli",
        traffic_level_label: "Traffic Level (1-10):",
        traffic_level_placeholder: "Traffic level",
        predict_eta_btn: "Predict ETA",
        prediction_placeholder: "Prediction will appear here...",
        route_planner_title: "🗺 Smart Route Planner",
        find_best_route_btn: "Find Best Route",
        route_reco_placeholder: "Enter locations to get the best transport option recommendation.",
        incident_report_title: "⛓ Immutable Incident Reporting",
        incident_placeholder: "Report delay, breakdown, or incident...",
        submit_report_btn: "Submit Report",
        chatbot_title: "Mr. Conductor",
        chatbot_placeholder: "Ask something...",
        send_btn: "Send",
        main_heading: "India's No.1 bus tracking & booking experience",
        main_subheading: "Real-time vehicle locations, smart ETA predictions and easy route planning — all in one place.",
        women_booking: "Booking for women",
        search_buses: "🔍 Search buses",
        festive_offer: "Book trains for festivals",
        offer_code: "Get ₹100 off using code FESTIVE",
        delhi_bookings: "25,000+ people booked from New Delhi last month",
        refresh_vehicles_btn: "Refresh Vehicles",
        footer_text: "Made with ❤ — SmartTransit Prototype",
        book_ticket: "Book Your Ticket",
        confirm_booking: "Confirm Booking",
        help_center: "Help Center",
    },
    hi: {
        route_map_link: "🗺️ मार्ग नक्शा",
        delhi_bus_map_title: "दिल्ली बस मार्ग नक्शा",
        chat_btn: "💬 चैट",
        main_title: "🚏 स्मार्टट्रांजिट",
        main_subtitle: "वास्तविक समय सार्वजनिक परिवहन ट्रैकिंग और स्मार्ट ईटीए भविष्यवाणी। शहरी गतिशीलता को होशियार, तेज और अधिक विश्वसनीय बनाना।",
        explore_app_btn: "ऐप का अन्वेषण करें",
        live_map_title: "📍 वाहनों और बस स्टॉप के साथ लाइव नक्शा",
        refresh_location_btn: "मेरा स्थान ताज़ा करें",
        where_is_my_bus_title: " मेरी बस कहाँ है?",
        by_route_tab: "मार्ग से",
        by_bus_number_tab: "बस नंबर से",
        from_label: "से",
        from_placeholder: "उदा., मोरी गेट",
        to_label: "तक",
        to_placeholder: "उदा., अंबेडकर नगर",
        find_buses_btn: "बसें खोजें",
        bus_number_label: "बस नंबर",
        bus_number_placeholder: "उदा., 411",
        track_bus_btn: "बस ट्रैक करें",
        recent_searches_title: "हाल की खोजें",
        search_history_placeholder: "आपकी खोज इतिहास यहाँ दिखाई देगा।",
        predictive_eta_title: "🧠 भविष्य कहनेवाला ईटीए",
        start_location_label: "आरंभ स्थान:",
        destination_label: "गंतव्य:",
        to_kashmere_placeholder: "उदा., महरौली",
        traffic_level_label: "यातायात स्तर (1-10):",
        traffic_level_placeholder: "यातायात स्तर",
        predict_eta_btn: "ईटीए की भविष्यवाणी करें",
        prediction_placeholder: "भविष्यवाणी यहाँ दिखाई देगी...",
        route_planner_title: "🗺 स्मार्ट मार्ग योजनाकार",
        find_best_route_btn: "सबसे अच्छा मार्ग खोजें",
        route_reco_placeholder: "सर्वोत्तम परिवहन विकल्प की सिफारिश प्राप्त करने के लिए स्थान दर्ज करें।",
        incident_report_title: "⛓ अपरिवर्तनीय घटना रिपोर्टिंग",
        incident_placeholder: "देरी, टूटने, या घटना की रिपोर्ट करें...",
        submit_report_btn: "रिपोर्ट सबमिट करें",
        chatbot_title: "श्री कंडक्टर",
        chatbot_placeholder: "कुछ पूछें...",
        send_btn: "भेजें",
        main_heading: "भारत का नंबर 1 बस ट्रैकिंग और बुकिंग अनुभव",
        main_subheading: "वास्तविक समय वाहन स्थान, स्मार्ट ईटीए भविष्यवाणियां और आसान मार्ग योजना - सब एक ही स्थान पर।",
        women_booking: "महिलाओं के लिए बुकिंग",
        search_buses: "🔍 बसें खोजें",
        festive_offer: "त्योहारों के लिए ट्रेन बुक करें",
        offer_code: "FESTIVE कोड का उपयोग करके ₹100 की छूट प्राप्त करें",
        delhi_bookings: "पिछले महीने नई दिल्ली से 25,000 से अधिक लोगों ने बुकिंग की",
        refresh_vehicles_btn: "वाहनों को ताज़ा करें",
        footer_text: "❤ के साथ बनाया गया - स्मार्टट्रांजिट प्रोटोटाइप",
        book_ticket: "अपना टिकट बुक करें",
        confirm_booking: "बुकिंग की पुष्टि करें",
        help_center: "सहायता केंद्र",
    },
    pa: {
        route_map_link: "🗺️ ਰੂਟ ਦਾ ਨਕਸ਼ਾ",
        delhi_bus_map_title: "ਦਿੱਲੀ ਬੱਸ ਰੂਟ ਦਾ ਨਕਸ਼ਾ",
        chat_btn: "💬 ਗੱਲਬਾਤ",
        main_title: "🚏 ਸਮਾਰਟ ਟ੍ਰਾਂਜ਼ਿਟ",
        main_subtitle: "ਰੀਅਲ-ਟਾਈਮ ਪਬਲਿਕ ਟ੍ਰਾਂਸਪੋਰਟ ਟ੍ਰੈਕਿੰਗ ਅਤੇ ਸਮਾਰਟ ਈਟੀਏ ਭਵਿੱਖਬਾਣੀ। ਸ਼ਹਿਰੀ ਗਤੀਸ਼ੀਲਤਾ ਨੂੰ ਚੁਸਤ, ਤੇਜ਼ ਅਤੇ ਵਧੇਰੇ ਭਰੋਸੇਮੰਦ ਬਣਾਉਣਾ।",
        explore_app_btn: "ਐਪ ਦੀ ਪੜਚੋਲ ਕਰੋ",
        live_map_title: "📍 ਵਾਹਨਾਂ ਅਤੇ ਬੱਸ ਅੱਡਿਆਂ ਦੇ ਨਾਲ ਲਾਈਵ ਨਕਸ਼ਾ",
        refresh_location_btn: "ਮੇਰਾ ਟਿਕਾਣਾ ਤਾਜ਼ਾ ਕਰੋ",
        where_is_my_bus_title: "🔍 ਮੇਰੀ ਬੱਸ ਕਿੱਥੇ ਹੈ?",
        by_route_tab: "ਰੂਟ ਦੁਆਰਾ",
        by_bus_number_tab: "ਬੱਸ ਨੰਬਰ ਦੁਆਰਾ",
        from_label: "ਤੋਂ",
        from_placeholder: "ਉਦਾਹਰਨ, ਮੋਰੀ ਗੇਟ",
        to_label: "ਨੂੰ",
        to_placeholder: "ਉਦਾਹਰਨ, ਅੰਬੇਡਕਰ ਨਗਰ",
        find_buses_btn: "ਬੱਸਾਂ ਲੱਭੋ",
        bus_number_label: "ਬੱਸ ਨੰਬਰ",
        bus_number_placeholder: "ਉਦਾਹਰਨ, 411",
        track_bus_btn: "ਬੱਸ ਨੂੰ ਟਰੈਕ ਕਰੋ",
        recent_searches_title: "ਹਾਲੀਆ ਖੋਜਾਂ",
        search_history_placeholder: "ਤੁਹਾਡਾ ਖੋਜ ਇਤਿਹਾਸ ਇੱਥੇ ਦਿਖਾਈ ਦੇਵੇਗਾ।",
        predictive_eta_title: "🧠 ਭਵਿੱਖਬਾਣੀ ਈ.ਟੀ.ਏ.",
        start_location_label: "ਸ਼ੁਰੂਆਤੀ ਸਥਾਨ:",
        destination_label: "ਮੰਜ਼ਿਲ:",
        to_kashmere_placeholder: "ਉਦਾਹਰਨ, ਮਹਿਰੌਲੀ",
        traffic_level_label: "ਟ੍ਰੈਫਿਕ ਪੱਧਰ (1-10):",
        traffic_level_placeholder: "ਟ੍ਰੈਫਿਕ ਪੱਧਰ",
        predict_eta_btn: "ਈਟੀਏ ਦੀ ਭਵਿੱਖਬਾਣੀ ਕਰੋ",
        prediction_placeholder: "ਭਵਿੱਖਬਾਣੀ ਇੱਥੇ ਦਿਖਾਈ ਦੇਵੇਗੀ...",
        route_planner_title: "🗺 ਸਮਾਰਟ ਰੂਟ ਯੋਜਨਾਕਾਰ",
        find_best_route_btn: "ਵਧੀਆ ਰਸਤਾ ਲੱਭੋ",
        route_reco_placeholder: "ਸਭ ਤੋਂ ਵਧੀਆ ਆਵਾਜਾਈ ਵਿਕਲਪ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਸਥਾਨ ਦਾਖਲ ਕਰੋ।",
        incident_report_title: "⛓ ਅਟੱਲ ਘਟਨਾ ਦੀ ਰਿਪੋਰਟਿੰਗ",
        incident_placeholder: "ਦੇਰੀ, ਟੁੱਟਣ, ਜਾਂ ਘਟਨਾ ਦੀ ਰਿਪੋਰਟ ਕਰੋ...",
        submit_report_btn: "ਰਿਪੋਰਟ ਦਰਜ ਕਰੋ",
        chatbot_title: "ਸ਼੍ਰੀਮਾਨ ਕੰਡਕਟਰ",
        chatbot_placeholder: "ਕੁਝ ਪੁੱਛੋ...",
        send_btn: "ਭੇਜੋ",
        main_heading: "ਭਾਰਤ ਦਾ ਨੰਬਰ 1 ਬੱਸ ਟਰੈਕਿੰਗ ਅਤੇ ਬੁਕਿੰਗ ਅਨੁਭਵ",
        main_subheading: "ਰੀਅਲ-ਟਾਈਮ ਵਾਹਨ ਸਥਾਨ, ਸਮਾਰਟ ਈਟੀਏ ਭਵਿੱਖਬਾਣੀਆਂ ਅਤੇ ਆਸਾਨ ਰੂਟ ਦੀ ਯੋਜਨਾਬੰਦੀ - ਸਭ ਇੱਕ ਥਾਂ 'ਤੇ।",
        women_booking: "ਔਰਤਾਂ ਲਈ ਬੁਕਿੰਗ",
        search_buses: "🔍 ਬੱਸਾਂ ਦੀ ਖੋਜ ਕਰੋ",
        festive_offer: "ਤਿਉਹਾਰਾਂ ਲਈ ਰੇਲ ਗੱਡੀਆਂ ਬੁੱਕ ਕਰੋ",
        offer_code: "FESTIVE ਕੋਡ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ₹100 ਦੀ ਛੋਟ ਪ੍ਰਾਪਤ ਕਰੋ",
        delhi_bookings: "ਪਿਛਲੇ ਮਹੀਨੇ ਨਵੀਂ ਦਿੱਲੀ ਤੋਂ 25,000+ ਲੋਕਾਂ ਨੇ ਬੁੱਕ ਕੀਤਾ",
        refresh_vehicles_btn: "ਵਾਹਨ ਤਾਜ਼ਾ ਕਰੋ",
        footer_text: "❤ ਨਾਲ ਬਣਾਇਆ ਗਿਆ — ਸਮਾਰਟ ਟ੍ਰਾਂਜ਼ਿਟ ਪ੍ਰੋਟੋਟਾਈਪ",
        book_ticket: "ਆਪਣੀ ਟਿਕਟ ਬੁੱਕ ਕਰੋ",
        confirm_booking: "ਬੁਕਿੰਗ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
        help_center: "ਸਹਾਇਤਾ ਕੇਂਦਰ",
    }
};

function setLanguage(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.innerText = translations[lang][key];
            }
        }
    });
}

document.getElementById('language-selector').addEventListener('change', (event) => {
    setLanguage(event.target.value);
});

const gtfsStops = {};
const gtfsRoutes = [];
const gtfsBuses = [];

async function loadBusData() {
    try {
        const response = await fetch('routes.json');
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        for (const routeId in jsonData) {
            const routeData = jsonData[routeId];
            if (routeData.length > 0) {
                const routeStops = [];
                routeData.forEach(stop => {
                    const stopKey = `s${stop.stop_id}`;
                    if (!gtfsStops[stopKey]) {
                        gtfsStops[stopKey] = {
                            name: stop.stop_name,
                            lat: stop.lat,
                            lon: stop.lon
                        };
                    }
                    routeStops.push({ stopId: stopKey, arrival_time: stop.arrival_time, departure_time: stop.departure_time });
                });

                gtfsRoutes.push({
                    id: routeId,
                    name: `${routeData[0].stop_name} to ${routeData[routeData.length - 1].stop_name}`,
                    schedule: routeStops
                });

                // Simulate some buses for each route
                for (let i = 0; i < 2; i++) {
                    gtfsBuses.push({
                        id: `DL1PC${Math.floor(Math.random() * 9000) + 1000}`,
                        routeId: routeId,
                        currentStopIndex: Math.floor(Math.random() * routeStops.length),
                        hasWomenSeats: Math.random() > 0.5 // Simulate which buses have women-only seats
                    });
                }
            }
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => initMap(pos.coords.latitude, pos.coords.longitude), () => initMap());
        } else initMap();
        simulateBusMovement();
        setupAutocomplete();
    } catch (error) {
        console.error("Failed to load bus data:", error);
    }
}

let map, userMarker, db;
let vehicleMarkers = [];
let reportChain = [];

function initMap(lat = 28.65, lng = 77.23) {
    map = L.map('map').setView([lat, lng], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors'
    }).addTo(map);
    userMarker = L.marker([lat, lng], { icon: new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }) }).addTo(map).bindPopup('You are here').openPopup();
    updateVehicleMarkers();
}

function updateVehicleMarkers() {
    vehicleMarkers.forEach(m => map.removeLayer(m));
    vehicleMarkers = [];
    gtfsBuses.forEach(bus => {
        const route = gtfsRoutes.find(r => r.id === bus.routeId);
        if (!route || !route.schedule[bus.currentStopIndex]) return;
        const stopInfo = route.schedule[bus.currentStopIndex];
        const stop = gtfsStops[stopInfo.stopId];
        
        let lat = stop.lat;
        let lon = stop.lon;
        if (bus.currentStopIndex + 1 < route.schedule.length) {
            const nextStop = gtfsStops[route.schedule[bus.currentStopIndex + 1].stopId];
            lat = stop.lat + (nextStop.lat - stop.lat) * 0.5;
            lon = stop.lon + (nextStop.lon - stop.lon) * 0.5;
        }
        
        const marker = L.marker([lat, lon], { icon: new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        }) }).addTo(map)
            .bindPopup(`<strong>Bus:</strong> ${bus.id}<br/><strong>Route:</strong> ${route.id}<br/><strong>Next Stop:</strong> ${stop.name}`);
        vehicleMarkers.push(marker);
    });
}

function refreshLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude, lng = pos.coords.longitude;
            userMarker.setLatLng([lat, lng]).bindPopup('You are here').openPopup();
            map.setView([lat, lng], 14, { animate: true });
        }, () => alert('Location not available. Using default location.'));
    }
}

function calculatePredictiveETA() {
    const start = document.getElementById('etaStartLocation').value.trim();
    const end = document.getElementById('etaEndLocation').value.trim();
    const traffic = parseFloat(document.getElementById('trafficInput').value) || 0;
    const resultEl = document.getElementById('predictiveEtaResult');

    if (!start || !end) {
        resultEl.innerHTML = `<p class="text-red-600">Please enter a start and end location.</p>`;
        return;
    }

    const route = gtfsRoutes.find(r => {
        const startIndex = r.schedule.findIndex(s => gtfsStops[s.stopId].name.toLowerCase().includes(start.toLowerCase()));
        const endIndex = r.schedule.findIndex(s => gtfsStops[s.stopId].name.toLowerCase().includes(end.toLowerCase()));
        return startIndex !== -1 && endIndex !== -1 && startIndex < endIndex;
    });

    if (!route) {
        resultEl.innerHTML = `<p class="text-red-600">No direct bus route found for this journey.</p>`;
        return;
    }

    const startIndex = route.schedule.findIndex(s => gtfsStops[s.stopId].name.toLowerCase().includes(start.toLowerCase()));
    const endIndex = route.schedule.findIndex(s => gtfsStops[s.stopId].name.toLowerCase().includes(end.toLowerCase()));
    
    const numStops = endIndex - startIndex;
    const baseTimePerStop = 3; 
    const scheduledDuration = numStops * baseTimePerStop;
    
    const trafficDelay = numStops * (traffic * 0.25); 
    const predictedEta = scheduledDuration + trafficDelay;

    resultEl.innerHTML = `
        <p><strong>Stops to travel:</strong> ${numStops}</p>
        <p><strong>Predicted ETA with Traffic:</strong> ${predictedEta.toFixed(1)} minutes</p>
        <p class="text-sm text-gray-600">On route: ${route.name}</p>
    `;
}

function findBestRoute() {
    const start = document.getElementById('startLocationPlanner').value.trim();
    const end = document.getElementById('endLocationPlanner').value.trim();
    const resultEl = document.getElementById('routeRecommendation');

    if (!start || !end) { 
        resultEl.innerHTML = `<p class="text-red-600">Please enter start and destination.</p>`;
        return; 
    }

    const matchingRoutes = gtfsRoutes.filter(route => {
        const startIndex = route.schedule.findIndex(s => gtfsStops[s.stopId].name.toLowerCase().includes(start.toLowerCase()));
        const endIndex = route.schedule.findIndex(s => gtfsStops[s.stopId].name.toLowerCase().includes(end.toLowerCase()));
        return startIndex !== -1 && endIndex !== -1 && startIndex < endIndex;
    });
    
    if (matchingRoutes.length > 0) {
            let recommendations = matchingRoutes.map(route => {
                return `<div class="mb-2">
                            <p>🚀 <strong>Best Option: Bus</strong></p>
                            <p><strong>Route:</strong> ${route.name} (${route.id})</p>
                        </div>`;
        }).join('');
        resultEl.innerHTML = recommendations;
    } else {
        resultEl.innerHTML = `
            <p>No direct bus route found.</p>
            <p class="text-sm text-gray-600">Consider alternative transport like Auto or Metro.</p>
        `;
    }
}

function submitImmutableReport() {
    const report = document.getElementById('reportInput').value.trim();
    if (!report) { alert('Enter report'); return; }
    const prev = reportChain.length ? reportChain[reportChain.length - 1].hash : 'GENESIS';
    const ts = new Date().toISOString();
    const hash = CryptoJS.SHA256(`${prev}|${ts}|${report}`).toString();
    reportChain.push({ previousHash: prev, timestamp: ts, report, hash });
    displayReportChain();
    document.getElementById('reportInput').value = '';
}

function displayReportChain() {
    document.getElementById('reportChain').innerHTML = reportChain.map(b => `
        <div class="p-2 bg-white rounded shadow mb-2">
            <p><strong>Timestamp:</strong> ${b.timestamp}</p>
            <p><strong>Report:</strong> ${b.report}</p>
            <p><strong>Hash:</strong> ${b.hash.substring(0,20)}...</p>
            <p><strong>Previous Hash:</strong> ${b.previousHash.substring(0,20)}...</p>
        </div>`).join('');
}

const tabRoute = document.getElementById('tab-route');
const tabNumber = document.getElementById('tab-number');
const formRoute = document.getElementById('form-route');
const formNumber = document.getElementById('form-number');
const resultsDiv = document.getElementById('results');
const historyListDiv = document.getElementById('history-list');
let userId;

function switchTab(tab) {
    if (tab === 'route') {
        tabRoute.classList.add('bg-white', 'text-blue-600', 'shadow');
        tabNumber.classList.remove('bg-white', 'text-blue-600', 'shadow');
        formRoute.classList.remove('hidden');
        formNumber.classList.add('hidden');
    } else {
        tabNumber.classList.add('bg-white', 'text-blue-600', 'shadow');
        tabRoute.classList.remove('bg-white', 'text-blue-600', 'shadow');
        formNumber.classList.remove('hidden');
        formRoute.classList.add('hidden');
    }
}

function findBusesByRoute(start, end) {
    const forWomen = document.getElementById('womenToggle').checked;
    let matchingRoutes = gtfsRoutes.filter(route => {
        const startIndex = route.schedule.findIndex(s => gtfsStops[s.stopId].name.toLowerCase().includes(start.toLowerCase()));
        const endIndex = route.schedule.findIndex(s => gtfsStops[s.stopId].name.toLowerCase().includes(end.toLowerCase()));
        return startIndex !== -1 && endIndex !== -1 && startIndex < endIndex;
    });

    let busesToDisplay = [];
    matchingRoutes.forEach(route => {
        const busesOnRoute = gtfsBuses.filter(bus => bus.routeId === route.id);
        busesToDisplay.push(...busesOnRoute.map(bus => ({...bus, routeName: route.name})));
    });

    if (forWomen) {
        busesToDisplay = busesToDisplay.filter(bus => bus.hasWomenSeats);
    }
    
    if (busesToDisplay.length === 0) {
            resultsDiv.innerHTML = `<p class="text-center text-gray-500 p-4 bg-gray-50 rounded-lg">No direct buses found for this route.</p>`;
            return;
    }

    let html = busesToDisplay.map(bus => {
        return `<div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4 cursor-pointer bus-details-toggle" data-bus-id="${bus.id}">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-bold text-blue-700">${bus.id}</p>
                            <p class="text-sm text-gray-600">${bus.routeName}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-sm text-green-600 font-medium">On Time</p>
                            ${bus.hasWomenSeats ? `<p class="text-xs text-pink-500">Women seats available</p>` : ''}
                        </div>
                    </div>
                    <div class="text-center mt-2">
                        <span class="text-xs text-blue-500 font-semibold">Tap to see details & book</span>
                    </div>
                </div>`;
    }).join('');
    resultsDiv.innerHTML = html;
    saveSearchHistory({ type: 'route', start, end });
}

function findBusByNumber(busId) {
    const route = gtfsRoutes.find(r => r.id.toLowerCase() === busId.toLowerCase());
    if (!route) {
        resultsDiv.innerHTML = `<p class="text-center text-gray-500 p-4 bg-gray-50 rounded-lg">Route number not found.</p>`;
        return;
    }
    
    const busesOnRoute = gtfsBuses.filter(b => b.routeId === route.id);
    if(busesOnRoute.length === 0){
            resultsDiv.innerHTML = `<p class="text-center text-gray-500 p-4 bg-gray-50 rounded-lg">No active buses found on this route right now.</p>`;
            return;
    }

    let html = '';
    busesOnRoute.forEach(bus => {
        let timelineHtml = route.schedule.map((stopInfo, index) => {
            const stop = gtfsStops[stopInfo.stopId];
            const isPast = index < bus.currentStopIndex;
            const isCurrent = index === bus.currentStopIndex;
            let dotClass = isPast ? 'bg-green-500' : (isCurrent ? 'bg-blue-500 ring-4 ring-blue-200' : 'bg-gray-300');
            let textClass = isPast ? 'text-gray-800 line-through' : (isCurrent ? 'text-blue-700 font-bold' : 'text-gray-500');
            let timeStatus = isPast ? `Departed at ${stopInfo.departure_time}` : (isCurrent ? `Arrived at ${stopInfo.arrival_time}` : `Expected at ${stopInfo.arrival_time}`);

            return `<div class="timeline-item relative pl-10 pb-10">
                        <div class="timeline-dot absolute w-5 h-5 rounded-full ${dotClass}">
                            ${isCurrent ? '<svg class="bus-icon text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5-1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>' : ''}
                        </div>
                        <div class="${textClass}"><p class="font-medium">${stop.name}</p><p class="text-sm"><span class="text-xs ml-2">${timeStatus}</span></p></div></div>`;
        }).join('');

            html += `<div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
                        <div class="flex justify-between items-center mb-4 pb-4 border-b"><div><p class="font-bold text-xl text-blue-700">Bus: ${bus.id}</p><p class="text-md text-gray-600">On Route ${route.name} (${route.id})</p></div>
                        <div class="text-right"><p class="text-sm text-green-600 font-bold bg-green-100 px-2 py-1 rounded">LIVE</p></div></div>
                        <div>${timelineHtml}</div></div>`;
    });
    resultsDiv.innerHTML = html;
    saveSearchHistory({ type: 'number', number: busId });
}

function showBusDetails(busId) {
    openBookingModal();
}

async function saveSearchHistory(query) {
        if (!userId || !db) return;
        try {
            const historyCollection = collection(db, `artifacts/${typeof __app_id !== 'undefined' ? __app_id : 'default'}/users/${userId}/searchHistory`);
            await addDoc(historyCollection, { ...query, timestamp: new Date() });
        } catch (error) { console.error("Error saving history: ", error); }
}

function loadSearchHistory() {
        if (!userId || !db) return;
        const historyCollection = collection(db, `artifacts/${typeof __app_id !== 'undefined' ? __app_id : 'default'}/users/${userId}/searchHistory`);
        const q = query(historyCollection, orderBy('timestamp', 'desc'), limit(5));
        onSnapshot(q, (snapshot) => {
                if (snapshot.empty) return;
                let historyHtml = '';
                const uniqueSearches = new Map();
                snapshot.docs.forEach(doc => {
                    const data = doc.data();
                    const key = data.type === 'route' ? `route-${data.start}-${data.end}` : `number-${data.number}`;
                    if (!uniqueSearches.has(key)) uniqueSearches.set(key, data);
                });
                uniqueSearches.forEach(data => {
                    if (data.type === 'route') {
                            historyHtml += `<div class="bg-gray-50 p-3 rounded-lg flex items-center justify-between cursor-pointer history-item" data-type="route" data-start="${data.start}" data-end="${data.end}"><div><p class="font-medium text-sm">${data.start} → ${data.end}</p><p class="text-xs text-gray-500">Route Search</p></div><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div>`;
                    } else {
                            historyHtml += `<div class="bg-gray-50 p-3 rounded-lg flex items-center justify-between cursor-pointer history-item" data-type="number" data-number="${data.number}"><div><p class="font-medium text-sm">Route ${data.number}</p><p class="text-xs text-gray-500">Route Number Search</p></div><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div>`;
                    }
                });
                historyListDiv.innerHTML = historyHtml;
        });
}

function handleHistoryClick(e) {
    const item = e.target.closest('.history-item');
    if (!item) return;
    const { type, start, end, number } = item.dataset;
    if (type === 'route') {
        document.getElementById('start-point').value = start;
        document.getElementById('destination').value = end;
        switchTab('route');
        findBusesByRoute(start, end);
    } else {
        document.getElementById('bus-number').value = number;
        switchTab('number');
        findBusByNumber(number);
    }
        window.scrollTo({ top: document.getElementById('mainContent').offsetTop, behavior: 'smooth' });
}

function simulateBusMovement() {
    setInterval(() => {
        gtfsBuses.forEach(bus => {
            const route = gtfsRoutes.find(r => r.id === bus.routeId);
            if (route) {
                bus.currentStopIndex = (bus.currentStopIndex + 1) % route.schedule.length;
            }
        });
        if(map) {
            updateVehicleMarkers();
        }
        const activeBusResult = document.querySelector('.bus-details-toggle');
        if (activeBusResult) {
            const activeBusId = activeBusResult.dataset.busId;
            const bus = gtfsBuses.find(b => b.id === activeBusId);
            if (bus) findBusByNumber(bus.routeId);
        }
    }, 15000);
}

function toggleChatbot() {
    document.getElementById('chatbot-modal').classList.toggle('hidden');
}

async function handleChat() {
    const inputEl = document.getElementById('chat-input');
    const outputEl = document.getElementById('chat-output');
    const userMessage = inputEl.value.trim();
    if (!userMessage) return;

    outputEl.innerHTML += `<div class="text-right text-blue-800 my-1"><strong>You:</strong> ${userMessage}</div>`;
    inputEl.value = '';
    outputEl.scrollTop = outputEl.scrollHeight;

    const thinkingEl = document.createElement('div');
    thinkingEl.classList.add('text-left', 'text-gray-800', 'my-1');
    thinkingEl.innerHTML = `<strong>Mr. Conductor:</strong> Thinking...`;
    outputEl.appendChild(thinkingEl);
    outputEl.scrollTop = outputEl.scrollHeight;
    
    const systemPrompt = `You are Mr. Conductor, a friendly and helpful bus transit assistant for the Delhi area. Your goal is to answer user questions about bus routes, stops, and schedules. You must ONLY use the data provided below to answer questions. If the information is not in the data, say you don't have that information. Do not make anything up. Also handle basic greetings and tasks.

    Here is the available bus data:
    Stops: ${JSON.stringify(gtfsStops)}
    Routes and Schedules: ${JSON.stringify(gtfsRoutes)}
    Live Bus Locations: ${JSON.stringify(gtfsBuses)}
    `;

    const apiKey = ""; // IMPORTANT: ADD YOUR GOOGLE AI API KEY HERE
    if (!apiKey) {
        thinkingEl.innerHTML = `<strong>Mr. Conductor:</strong> Sorry, my API key is missing. The developer needs to add it to the script.`;
        outputEl.scrollTop = outputEl.scrollHeight;
        return;
    }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{ parts: [{ text: userMessage }] }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const result = await response.json();
        
        let botReply = "Sorry, I had trouble finding an answer. Please try again.";
        if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts[0].text) {
            botReply = result.candidates[0].content.parts[0].text;
        }
        thinkingEl.innerHTML = `<strong>Mr. Conductor:</strong> ${botReply}`;

    } catch(error) {
        console.error("Chat API Error:", error);
        thinkingEl.innerHTML = `<strong>Mr. Conductor:</strong> Sorry, I'm having trouble connecting right now. Please check the API key and try again.`;
    }

    outputEl.scrollTop = outputEl.scrollHeight;
}

function generateRouteMap() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.getElementById('routeMapSvg');
    const legend = document.getElementById('routeMapLegend');
    svg.innerHTML = '';
    legend.innerHTML = '';

    const routeColors = {
        '1': '#e50025', '2': '#0057e7', '4': '#50C878', '6': '#FFD700', 
    };
    const stopPositions = {};
    let x = 50, y = 50;
    const displayedStops = new Set();
    gtfsRoutes.slice(0, 4).forEach(route => {
        route.schedule.forEach(stopInfo => displayedStops.add(stopInfo.stopId));
    });

    Array.from(displayedStops).forEach(stopId => {
        stopPositions[stopId] = { x, y };
        x += 180;
        if (x > 1200) {
            x = 50;
            y += 120;
        }
    });

    const stopRouteCount = {};
    Object.keys(gtfsStops).forEach(stopId => stopRouteCount[stopId] = 0);
    gtfsRoutes.forEach(route => {
        route.schedule.forEach(stopInfo => stopRouteCount[stopInfo.stopId]++);
    });

    gtfsRoutes.slice(0, 4).forEach(route => {
        legend.innerHTML += `<div class="flex items-center"><span class="w-4 h-4 mr-2" style="background-color: ${routeColors[route.id]}; border: 1px solid #777;"></span><span class="font-semibold text-sm">${route.name} (${route.id})</span></div>`;
    });

    const pathsGroup = document.createElementNS(svgNS, 'g');
    const stopsGroup = document.createElementNS(svgNS, 'g');
    svg.appendChild(pathsGroup);
    svg.appendChild(stopsGroup);

    gtfsRoutes.slice(0, 4).forEach(route => {
        for (let i = 0; i < route.schedule.length - 1; i++) {
            const pos1 = stopPositions[route.schedule[i].stopId];
            const pos2 = stopPositions[route.schedule[i+1].stopId];
            if (!pos1 || !pos2) continue;

            let pathData = `M ${pos1.x} ${pos1.y} L ${pos2.x} ${pos1.y} L ${pos2.x} ${pos2.y}`;
            const path = document.createElementNS(svgNS, 'path');
            path.setAttribute('d', pathData);
            path.setAttribute('stroke', routeColors[route.id] || '#333');
            path.setAttribute('stroke-width', 4);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
            pathsGroup.appendChild(path);
        }
    });
    
    Object.keys(stopPositions).forEach(stopId => {
        const pos = stopPositions[stopId];
        const stop = gtfsStops[stopId];
        const isInterchange = stopRouteCount[stopId] > 1;

        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx', pos.x);
        circle.setAttribute('cy', pos.y);
        circle.setAttribute('r', isInterchange ? '8' : '5');
        circle.setAttribute('fill', 'white');
        circle.setAttribute('stroke', isInterchange ? 'black' : '#555');
        circle.setAttribute('stroke-width', isInterchange ? '3' : '2');
        stopsGroup.appendChild(circle);

        const text = document.createElementNS(svgNS, 'text');
        text.setAttribute('x', pos.x + 12);
        text.setAttribute('y', pos.y + 4);
        text.setAttribute('font-size', '12');
        text.setAttribute('font-family', 'sans-serif');
        text.setAttribute('fill', '#333');
        text.textContent = stop.name;
        stopsGroup.appendChild(text);
    });
    
    const padding = 50;
    const allCoords = Object.values(stopPositions);
    const minX = Math.min(...allCoords.map(p => p.x)) - padding;
    const minY = Math.min(...allCoords.map(p => p.y)) - padding;
    const width = Math.max(...allCoords.map(p => p.x)) - minX + padding;
    const height = Math.max(...allCoords.map(p => p.y)) - minY + padding;
    
    svg.setAttribute("viewBox", `${minX} ${minY} ${width} ${height}`);

    let isPanning = false;
    let startPoint = { x: 0, y: 0 };
    let viewBox = { x: minX, y: minY, w: width, h: height };

    const getPoint = (e) => {
        const CTM = svg.getScreenCTM();
        return {
            x: (e.clientX - CTM.e) / CTM.a,
            y: (e.clientY - CTM.f) / CTM.d
        };
    };
    
    svg.addEventListener('mousedown', function(e) {
        isPanning = true;
        startPoint = { x: e.clientX, y: e.clientY };
        svg.style.cursor = 'grabbing';
    });
    
    svg.addEventListener('mousemove', function(e) {
        if (!isPanning) return;
        let dx = (startPoint.x - e.clientX) * (viewBox.w / svg.clientWidth);
        let dy = (startPoint.y - e.clientY) * (viewBox.h / svg.clientHeight);
        viewBox.x += dx;
        viewBox.y += dy;
        svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        startPoint = { x: e.clientX, y: e.clientY };
    });

    const stopPanning = () => { if (isPanning) { isPanning = false; svg.style.cursor = 'grab'; } };
    svg.addEventListener('mouseup', stopPanning);
    svg.addEventListener('mouseleave', stopPanning);

    svg.addEventListener('wheel', function(e) {
        e.preventDefault();
        const zoomIntensity = 0.1;
        const { x, y } = getPoint(e);
        const dw = viewBox.w * Math.sign(e.deltaY) * zoomIntensity;
        const dh = viewBox.h * Math.sign(e.deltaY) * zoomIntensity;
        if ((viewBox.w - dw) < 100 || (viewBox.h - dh) < 100) return;
        viewBox.x += dw * (x - viewBox.x) / viewBox.w;
        viewBox.y += dh * (y - viewBox.y) / viewBox.h;
        viewBox.w -= dw;
        viewBox.h -= dh;
        svg.setAttribute('')
