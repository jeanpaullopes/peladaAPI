import RepositorioCampeonatos
from '../repositorios/RepositorioCampeoonatos.js';
import RegraNegCampeonatos from '../regrasNegocio/RegraNegCampeonatos.js';

const ControllerCampeonatos = {
    buscarTodosCampeonantos() {
        return RepositorioCampeonatos.buscarTodosCampeonatos();
    },
    inserirCampeonato(usu, camp) {
        if (!RegraNegCampeonatos.podeIncluir(usu)) {
            console.log('vou lancar exc 1')
            let erro = new Error("Usuário Não Autorizado");
            erro.codigoStatus = 401;
            throw erro;
        }
        if (!RegraNegCampeonatos.ehUmCampeonato(camp)){
            console.log('vou lancar exc 2');
            let erro = new Error('payload não é um campeonato');
            erro.codigoStatus = 422;
            throw erro
        }        
        RepositorioCampeonatos.incluirCampeonato(camp);
        return true;
    }

};
export default ControllerCampeonatos;