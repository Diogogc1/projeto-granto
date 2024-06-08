document.querySelector("button").addEventListener("click", async (event) => {
    event.preventDefault();
    await getDocumentValues(event);
});

async function getDocumentValues(event) {
    event.preventDefault();
    try {
        const file = document.querySelector("input").files[0];
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch("http://localhost:5000/post", {
            method: "post",
            body: formData
        });

        event.preventDefault();

        const result = await response.json();

        if (result) {
            const message = result[0].message;

            console.log(message);

            const real_values = result[0].real_values;

            real_values.forEach(value => {
                const text = document.createElement("p");
                text.innerHTML = value;
                document.querySelector("body").appendChild(text);
            }) 
        }

    } catch (error) {
        console.error(error);
    }
}