const _fs = require('fs');

const _base_folder = { 
    imageFolder : "./base/image/",
    jsonFolder : "./base/json/"
}

const _build_folder = {
    imageFolder : "./build/image/",
    jsonFolder : "./build/json/"
}

const _file_extension = ".jpg"

const _new_index = [];
const createNewFileNameIndex = ( qty ) => {
    while( _new_index.length < qty )
    {
        let isPass = true;
        let randomNum = Math.floor(Math.random() * 10000);
        randomNum %= qty;
        for( let i = 0 ; i < _new_index.length ; i++ )
        {
            if( _new_index[i] === randomNum ){
                isPass = false;
                break;
            }
        }

        if( isPass ){
            _new_index.push( randomNum );
        }
    }
}

const getNewFileNameIndex = ( idx ) => {
    if( idx < _new_index.length )
        return _new_index[idx];

    return _new_index.length;
}


const main = () => {

    createNewFileNameIndex( 5 );

    const baseLinkFile = [];
    const baseFileImage = _fs.readdirSync(_base_folder.imageFolder );
    const baseFileJson = _fs.readdirSync(_base_folder.jsonFolder );
//    console.log( baseFileImage, baseFileJson );

    for( let i = 0 ; i < baseFileImage.length ; i++ )
    {
        for(let j = 0 ; j < baseFileJson.length ; j++ )
        {
            let tmpStrImage = baseFileImage[i].substring( 0, baseFileImage[i].length - _file_extension.length );
            let tmpStrJson = baseFileJson[j].substring( 0, baseFileJson[j].length - ".json".length );
            if( tmpStrImage === tmpStrJson ){
                baseLinkFile.push( {
                    fnImage : baseFileImage[i],
                    fnJson : baseFileJson[j]
                } );
            }
        }
    }

//    console.log( baseLinkFile );
    for( let i = 0 ; i < baseLinkFile.length ; i++ )
    {
        let newIdx = getNewFileNameIndex( i );
        let parseFN = {
            srcImage : _base_folder.imageFolder + baseLinkFile[i].fnImage,
            srcJson : _base_folder.jsonFolder + baseLinkFile[i].fnJson,
            desImage : _build_folder.imageFolder + newIdx + _file_extension,
            desJson : _build_folder.jsonFolder + newIdx + ".json",
        }
//        console.log( parseFN );
        _fs.copyFileSync( parseFN.srcImage, parseFN.desImage, _fs.constants.COPYFILE_FICLONE );

        const fsJsonData = _fs.readFileSync( parseFN.srcJson );
        const fsData = JSON.parse( fsJsonData );

        let strIdx = fsData.name.lastIndexOf( "#" );
        if( strIdx >= 0 ){
            const newName = fsData.name.substring( 0, strIdx + 1 ) + newIdx;        
            fsData.name = newName;
        }

        strIdx = fsData.image.lastIndexOf( "/" );
        if( strIdx >= 0 ){
            const newImage = fsData.image.substring( 0, strIdx + 1 ) + newIdx + _file_extension;
            fsData.image = newImage;
        }

        const makeJson = JSON.stringify( fsData );
        _fs.writeFileSync( parseFN.desJson, makeJson, (err) => { console.log(err)} );
    }

    console.log( "Done : ReName" );
}

main();