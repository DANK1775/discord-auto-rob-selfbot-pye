//obtener miembro con mas cash del sv
async function getIdCash(usersTop) {
    //regev de texto entre [] Y ()
    const regex = /\[([^\]]*)\]|\(([^)]*)\)/g;
    //array de IDs y USERS
    let username = []
    let id = []

    let match;

    while ((match = regex.exec(usersTop)) !== null) {
        // guardar en variable temporal cada valor
        let usernamew = match[1]
        let idw = match[2]

        // condicion ya que match obtiene undefined
        if (usernamew !== undefined) {
            username.push(usernamew)
        } else if (idw !== undefined) {
            //seprarar el link de discord del id
            idw = idw.slice(26)
            id.push(idw)
        }
    }

    // funcion interna para obtener el usuario con mas cash
    function rob() {
        for (let i = 0; i < 10; i++) {
            // verifica si esta en el sv
            if (isNaN(username[i])) {
                return id[i]
                i = 10
            }
        }
    }

    let robId = rob()
    // retorna el id que este en el sv con mas cash del momento
    return robId

}


module.exports ={
    getIdCash
}