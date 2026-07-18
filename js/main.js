import Header,{initHeader} from "./components/header.js";
import Footer from "./components/footer.js";




document.getElementById("header").innerHTML = Header();
document.getElementById("footer").innerHTML = Footer();
initHeader();