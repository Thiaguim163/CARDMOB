import { useState } from "react";
import Contato from "./Contato";

const ListaContatos = () => {
  const [contatos, setContatos] = useState([]);

  const [novoNome, setNovoNome] = useState("");
  const [novoTelefone, setNovoTelefone] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const adicionarOuEditarContato = () => {
    if (!novoNome || !novoTelefone) return;

    if (editandoId) {
      setContatos(
        contatos.map((contato) =>
          contato.id === editandoId
            ? { ...contato, nome: novoNome, telefone: novoTelefone }
            : contato
        )
      );
      setEditandoId(null);
    } else {
      setContatos([
        ...contatos,
        { id: Date.now(), nome: novoNome, telefone: novoTelefone },
      ]);
    }

    limparCampos();
  };

  const removerContato = (id) => {
    setContatos(contatos.filter((contato) => contato.id !== id));
  };

  const iniciarEdicao = (contato) => {
    setNovoNome(contato.nome);
    setNovoTelefone(contato.telefone);
    setEditandoId(contato.id);
  };

  const cancelarEdicao = () => {
    limparCampos();
    setEditandoId(null);
  };

  const limparCampos = () => {
    setNovoNome("");
    setNovoTelefone("");
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Lista de Contatos</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Nome"
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Telefone"
          value={novoTelefone}
          onChange={(e) => setNovoTelefone(e.target.value)}
        />
        <div className="button-group">
          <button onClick={adicionarOuEditarContato} className="button">
            {editandoId ? "Salvar" : "Adicionar"}
          </button>
          {editandoId && (
            <button onClick={cancelarEdicao} className="button-cancel">
              Cancelar
            </button>
          )}
        </div>
      </div>
      {contatos.map((contato) => (
        <Contato
          key={contato.id}
          {...contato}
          onDelete={() => removerContato(contato.id)}
          onEdit={() => iniciarEdicao(contato)}
        />
      ))}
    </div>
  );
};

export default ListaContatos;
