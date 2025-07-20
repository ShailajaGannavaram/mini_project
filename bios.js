async function semanticSearch() {
  const query = document.getElementById("searchInput").value.trim();
  const category = document.getElementById("categoryFilter").value.toLowerCase();
  const region = document.getElementById("regionFilter").value.toLowerCase();
  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = "⏳ Searching...";

  if (!query) return alert("Please enter a keyword or name.");

  try {
    const res = await fetch("http://localhost:4000/semantic-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    let data = await res.json();

    // Apply additional client-side filtering by tags
    if (category) {
      data = data.filter(b =>
        (b.tags || []).some(tag => tag.toLowerCase() === category)
      );
    }

    if (region) {
      data = data.filter(b =>
        (b.tags || []).some(tag => tag.toLowerCase() === region)
      );
    }

    if (!data.length) {
      resultsDiv.innerHTML = "❌ No results found.";
      return;
    }

    resultsDiv.innerHTML = data.map(b => `
      <div class="bio-card">
        <h3>${b.name}</h3>
        <p>${b.bio}</p>
      </div>
    `).join("");
  } catch (err) {
    resultsDiv.innerHTML = "⚠️ Failed to fetch results.";
  }
}

function startVoice() {
  const lang = document.getElementById("voiceLang").value || "en-IN";
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = lang;
  recognition.start();

  recognition.onresult = function(e) {
    document.getElementById("searchInput").value = e.results[0][0].transcript;
    semanticSearch();
  };
}
