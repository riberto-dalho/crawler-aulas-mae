const puppeteer = require("puppeteer");

const urls = [
    "https://teoriapsicanaliticaimes.blogspot.com/2020/09/0209-aula-6-sobre-dinamica-da-vida.html",
]

async function openPage(url) {
    const browser = await puppeteer.launch({
      headless: false,
      ignoreHTTPSErrors: false,
      devtools: true, 
      // slowMo: 10
    });
  
    const page = await browser.newPage();
  
    try {
      await page.goto(url);
    } catch (err) {
      console.log(err);
    }

    return page;

    //await browser.close();
  }

  async function start(){

    let page1 = await openPage(urls[0]);

    await page1.evaluate(async () => {

        let nomeAula = document
            .getElementsByTagName("h3")[0]
            .innerText
            .replace(/\//, "-");

        let conteudo = document
            .getElementsByClassName("post-body entry-content float-container")[0]
            .querySelectorAll("div, p");

        let videos = [];
        let nomeVideo = "";
        let urlVideo = "";

        conteudo
            .forEach(i => {
                const nodeName = i.nodeName.toUpperCase();

                if (nodeName === "P" && 
                    nomeVideo === "" && 
                    i.innerText.trim() !== "") 
                {
                    nomeVideo = i.innerText.trim();
                }

                if (nodeName === "DIV" &&
                    nomeVideo !== "")
                {
                    urlVideo = i.querySelector("iframe").src;
                    
                    //console.log(nomeVideo, urlVideo);
                    
                    videos.push({nomeVideo, urlVideo});

                    nomeVideo = "";
                }

            });

        console.log(nomeAula, videos);
        
    });

    //await breakCaptcha(page1);

    // await breakCaptcha(page1);

    // await breakCaptcha(page1);
}

start();