import Header,{initHeader} from "./components/header.js";
import Footer from "./components/footer.js";

const isHomePage = document.body.classList.contains("home-page");

document.getElementById("header").innerHTML = Header({showSearch: isHomePage });
document.getElementById("footer").innerHTML = Footer();
initHeader();