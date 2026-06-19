  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC1DyyBiA3RiZ3f_U1jkA1P6AAgI0Kh3sk",
    authDomain: "loginpage-3a9c0.firebaseapp.com",
    projectId: "loginpage-3a9c0",
    storageBucket: "loginpage-3a9c0.firebasestorage.app",
    messagingSenderId: "818275777736",
    appId: "1:818275777736:web:0c016a1672e4bab2e9f9fd",
    measurementId: "G-ZXXHJPN8PH"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
