const url =  "https://api.rootnet.in/covid19-in/stats/latest";

let regional_ = undefined;
async function main(){
    const covidreportsRaw = await fetch(url);
    const toJson = await covidreportsRaw.json();
    const summary = toJson.data.summary;
    const regional = toJson.data.regional;
    regional_ = regional;

    const total = document.getElementById("total");
    const confirmcasesin = document.getElementById("confirmcasesin");
    const confirmcasesfr = document.getElementById("confirmcasesfr");
    const discharged = document.getElementById("discharged");
    const deaths = document.getElementById("deaths");
    const uindenloconfirmedcases = document.getElementById("uindenloconfirmedcases");


    total.innerHTML = summary.total;
    confirmcasesin.innerHTML = summary.confirmedCasesIndian;
    confirmcasesfr.innerHTML = summary.confirmedCasesForeign;
    discharged.innerHTML = summary.discharged;
    deaths.innerHTML = summary.deaths;
    uindenloconfirmedcases.innerHTML = summary.confirmedButLocationUnidentified;

    const card = document.getElementById("cardbuttons");
    for (const index in regional){
        card.innerHTML += `
            <div class="card-body rounded m-2 border border-1 border-primary bg-success-subtle text-dark" style="cursor: pointer; width: 18rem;" onclick="showReport(${index})">
                <h5 class="card-title">${regional[index].loc}</h5>
                <p class="card-text">Open to see more</p>
            </div>
        `;
    }
}

function showReport(n){
    if (regional_ === undefined) return;
    const showrep = document.getElementById("showrep");
    const loc = document.getElementById("loc");
    showrep.innerHTML = `
        <p>
            <h6>According to the ${regional_[n].loc}</h6>
            There are total <span class="lh-1 text-success">${regional_[n].totalConfirmed}</span> cases.<br>
            <span class="lh-1 text-success">${regional_[n].confirmedCasesIndian}</span> of them are confirmed by indians and 
            <span class="lh-1 text-success">${regional_[n].confirmedCasesForeign}</span> of them are confirmed by foreigners. <br>
            <span class="lh-1 text-success">${regional_[n].discharged}</span> patients has been discharged and <span class="lh-1 text-success">${regional_[n].deaths}</span> has died due to covid.<br>
        </p>
    
    `;
    loc.innerHTML = regional_[n].loc;
    const offcanvas = new bootstrap.Offcanvas("#showreport");
    offcanvas.show();
}
