const ProductCard = ({ nome, preco, onAddToCart, onEdit, onDelete }) => {
  return (
    <div>
      <p>
        <strong>Produto:</strong> {nome}
      </p>
      <p>
        <strong>Preço:</strong> R$ {preco}
      </p>
      <button onClick={onAddToCart}>Adicionar ao Carrinho</button>
      <button onClick={onEdit}>Editar</button>
      <button onClick={onDelete}>Excluir</button>
      <hr />
    </div>
  );
};

export default ProductCard;
