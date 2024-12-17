document.addEventListener("DOMContentLoaded", function () {
    const keywordInput = document.getElementById("keyword");
    const platformSelect = document.getElementById("platform");
    const form = document.querySelector("form");
    const previewArea = document.createElement("div");

    // Insert live preview area after the form
    previewArea.id = "preview";
    previewArea.style.marginTop = "20px";
    previewArea.style.fontSize = "18px";
    previewArea.style.color = "#555";
    form.appendChild(previewArea);

    // Function to generate hashtags
    function generateHashtags(keyword, platform) {
        const formattedKeyword = capitalizeFirstLetter(keyword);
        const baseHashtags = {
            Facebook: [
                formattedKeyword,
                `${formattedKeyword}Life`,
                `Love${formattedKeyword}`,
                `Trending${formattedKeyword}`,
                `${formattedKeyword}Vibes`
            ],
            TikTok: [
                `#${formattedKeyword}`,
                `#${formattedKeyword}Challenge`,
                `#${formattedKeyword}Life`,
                `#${formattedKeyword}Trend`,
                `#${formattedKeyword}2024`
            ]
        };
        return baseHashtags[platform] || [];
    }

    // Function to capitalize the first letter
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    // Update live preview on input or selection change
    function updatePreview() {
        const keyword = keywordInput.value.trim();
        const platform = platformSelect.value;
        if (keyword && platform) {
            const hashtags = generateHashtags(keyword, platform);
            previewArea.innerHTML = `<strong>Live Preview:</strong> ${hashtags.join(", ")}`;
        } else {
            previewArea.innerHTML = "";
        }
    }

    // Event listeners
    keywordInput.addEventListener("input", updatePreview);
    platformSelect.addEventListener("change", updatePreview);

    // Handle form submission with AJAX
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission

        const keyword = keywordInput.value.trim();
        const platform = platformSelect.value;

        if (!keyword || !platform) {
            alert("Please enter a keyword and select a platform.");
            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append("keyword", keyword);
        formData.append("platform", platform);

        // AJAX request
        fetch("generate.php", {
            method: "POST",
            body: formData
        })
            .then((response) => response.text())
            .then((data) => {
                document.body.innerHTML = data; // Replace page content with server response
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            });
    });
});
