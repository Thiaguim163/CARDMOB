const Contato = ({ nome, telefone, onDelete, onEdit }) => {
  return (
    <div className="p-4 border rounded shadow flex justify-between items-center">
      <div>
        <p>
          <strong>Nome:</strong> {nome}
        </p>
        <p>
          <strong>Telefone:</strong> {telefone}
        </p>
      </div>
      <div>
        <button onClick={onEdit} className="button-edit">
          Editar
        </button>
        <button onClick={onDelete} className="button-delete">
          Excluir
        </button>
      </div>
    </div>
  );
};

export default Contato;
