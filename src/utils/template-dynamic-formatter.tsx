import { useState } from "react";

interface DataList {
    id_criterio: number;
    id_dato_criterio: number;
    parametro: string;
    prioridad: number;
    titulo: string;
    code: string;
    selected_status: number;
}

export function templateDynamicFormatter (text: string, dataListArray: DataList[] ) {
    const [descripcion, setDescripcion] = useState('');

    
    var resultText = text

        dataListArray.forEach(dataListRow => {
            console.dir(dataListRow.code)
            console.dir(dataListRow.titulo)
            const regex = new RegExp(dataListRow.code, 'gi');
            resultText.replace(regex,'{'+dataListRow.titulo+'}')
            console.dir(resultText)
        });
   


    return 
 
 }