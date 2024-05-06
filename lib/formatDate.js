export function formatDate(today){
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Se agrega 1 porque los meses van de 0 a 11
    const day = String(today.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    return date
}