import { useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [produtos, setProdutos] = useState([]);
  const [novoNome, setNovoNome] = useState("");
  const [novoPreco, setNovoPreco] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const adicionarOuEditarProduto = () => {
    if (!novoNome || !novoPreco) return;

    if (editandoId) {
      setProdutos(
        produtos.map((p) =>
          p.id === editandoId ? { ...p, nome: novoNome, preco: novoPreco } : p
        )
      );
      setEditandoId(null);
    } else {
      setProdutos([
        ...produtos,
        { id: Date.now(), nome: novoNome, preco: novoPreco },
      ]);
    }

    setNovoNome("");
    setNovoPreco("");
  };

  const removerProduto = (id) => {
    setProdutos(produtos.filter((p) => p.id !== id));
  };

  const iniciarEdicao = (produto) => {
    setNovoNome(produto.nome);
    setNovoPreco(produto.preco);
    setEditandoId(produto.id);
  };

  const cancelarEdicao = () => {
    setNovoNome("");
    setNovoPreco("");
    setEditandoId(null);
  };

  return (
    <div>
      <h2>Lista de Produtos</h2>

      <input
        type="text"
        placeholder="Nome do produto"
        value={novoNome}
        onChange={(e) => setNovoNome(e.target.value)}
      />
      <input
        type="number"
        placeholder="Preço"
        value={novoPreco}
        onChange={(e) => setNovoPreco(e.target.value)}
      />
      <button onClick={adicionarOuEditarProduto}>
        {editandoId ? "Salvar" : "Adicionar"}
      </button>
      {editandoId && <button onClick={cancelarEdicao}>Cancelar</button>}

      <div>
        {produtos.map((produto) => (
          <ProductCard
            key={produto.id}
            {...produto}
            onAddToCart={() => adicionarAoCarrinho(produto)}
            onEdit={() => iniciarEdicao(produto)}
            onDelete={() => removerProduto(produto.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
