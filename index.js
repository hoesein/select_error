fetch('https://hoesein.github.io/select_error/data/lp_state_region.json')
.then( response => {
    return response.json()
})
.then(json => {
    $('#state').append(json.map( sr => {
        return `<option value=${sr.sr_code}>${sr.sr_name}</option>` ;
    }));
});

$('#state').change(async e => {
    let sr_code = e.target.value ;
    await fetch('https://hoesein.github.io/select_error/data/lp_district.json')
    .then( res => {
        return res.json();
    })
    .then( json => {
        $('#district').html('');
        $('#district').html(`<option value=''>District</option>`);
        $('#district').append(json.map(d => {
            if(sr_code == d.sr_code){
                return `<option value=${d.d_code}>${d.d_name}</option>` ;
            }
        }));
    });
});

$('#district').change( async e => {
    let d_code = e.target.value ;
    await fetch('https://hoesein.github.io/select_error/data/lp_township.json')
    .then( res => {
        return res.json();
    })
    .then( json => {
        $('#township').html('');
        $('#township').html(`<option value=''>Township</option>`);
        $('#township').append( json.map( ts => {
            if(ts.d_code == d_code){
                return `<option value=${ts.ts_code}>${ts.ts_name}</option>` ;
            }
        }));
    });
});

$('#btn_save').click(() => {
    let tr = "<tr>" ;
    tr += `<td class="state">${$('#state').val()}</td>` ;
    tr += `<td class="district">${$('#district').val()}</td>` ;
    tr += `<td class="township">${$('#township').val()}</td>` ;
    tr += `<td class="desc">${$('#desc').val()}</td>` ;
    tr += "<td><button onclick='rePopulateSelect(this);'>Edit</button></td>" ;
    tr += "</tr>" ;
    $(".tbl_desc").append(tr);

    $('#state').val('').change();
    $('#district').val('').change();
    $('#township').val('').change();
    $('#desc').val('');
});

async function rePopulateSelect(btn){
    let tr = $(btn).closest('tr');
    let state = tr.find('.state').html() ;
    let district = tr.find('.district').html();
    let township = tr.find('.township').html();
    let desc = tr.find('.desc').html();

    // i want to repopulate this data to select
    // i am stuck at here
    await $('#state').val(state).change();
    await $('#district').val(district).change();
    await $('#township').val(township).change();
    await $('#desc').val(desc);
}

