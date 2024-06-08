document.querySelector("input").addEventListener("click", () => {
    getDocumentValues();
});

async function getDocumentValues() {
    const response = await fetch("http://localhost:5000");
    const data = await response.json();

    try {
        data.forEach(element => {
            const text = document.createElement("p");
            text.innerHTML = element;
            document.querySelector("body").appendChild(text);
        });
    } catch (error) {
        console.error(error);
    }
}