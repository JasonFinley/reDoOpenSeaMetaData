const _fs = require('fs');

const _base_folder = { 
    imageFolder : "./base/image/",
    jsonFolder : "./base/json/"
}

const _update_folder = {
    imageFolder : "./update/image/",
    jsonFolder : "./update/json/"
}

const _update_metadata = {
    description: "",
    external_url: "https://www.modelerosvillage.com/",
    image: "",
    name: "",
    animation_url : "",
}

const main = () => {

    const files = _fs.readdirSync( _base_folder.jsonFolder );

    for( let i = 0 ; i < files.length ; i++ )
    {
        const fsJsonData = _fs.readFileSync( _base_folder.jsonFolder + files[i] );
        const fsData = JSON.parse( fsJsonData );

        if( _update_metadata.description.length > 0 )
            fsData.description = _update_metadata.description;

        if( _update_metadata.external_url.length > 0 )
            fsData.external_url = _update_metadata.external_url;

        if( _update_metadata.animation_url.length > 0 )
            fsData.animation_url = _update_metadata.animation_url;

        const makeJson = JSON.stringify(fsData);
        _fs.writeFileSync( _update_folder.jsonFolder + files[i], makeJson, (err) => { console.log(err)} );
    }

    console.log( "Done : Update Json" );
}

main();