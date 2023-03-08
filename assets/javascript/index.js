const template = document.createElement("template");
template.innerHTML = `
<style>
.user-card{
  background: #f4f4f4;
  border-bottom: darkorchid 5px solid;
  width: 500px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
  margin-bottom: 15px;
}

.user-card img{
  width: 100%;
}

.user-card button{
  padding: 5px 10px;
  background: darkorchid;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  outline: none;
}
</style>

<div class="user-card">
  <img/>
  <div>
    <h3></h3>
    <div class="info">
      <p><slot name="email"/></p>
      <p><slot name="phone"/></p>
    </div>
    <button class="toggle-info">Hide Info</button>
  </div>
</div>
`;
class UserCard extends HTMLElement {
  constructor() {
    super();
    this.showInfo = true;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const shadowRoot = this.shadowRoot;
    shadowRoot.querySelector("img").src = this.getAttribute("avatar");
    shadowRoot.querySelector("h3").innerText = this.getAttribute("name");
    shadowRoot;
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector(".info");
    const toggleInfo = this.shadowRoot.querySelector(".toggle-info");

    if (this.showInfo) {
      info.style.display = "block";
      toggleInfo.textContent = "Hide Info";
    } else {
      info.style.display = "none";
      toggleInfo.textContent = "Show Info";
    }
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector(".toggle-info")
      .addEventListener("click", () => this.toggleInfo());
  }
}

window.customElements.define("user-card", UserCard);
