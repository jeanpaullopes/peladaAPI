const RegraNegCampeonatos = {
    podeIncluir(usuario) {
    
        return usuario.tipo == 'Admin';
    },
    ehUmCampeonato(camp) {
        
        return (
        camp.id != undefined &&
        camp.nome != undefined &&
        camp.temporada!= undefined &&
        camp.tipo!= undefined &&
        camp.regiao!= undefined);
    }
};
export default RegraNegCampeonatos;