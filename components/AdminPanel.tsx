import React, { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';
import { CATEGORIES } from '../constants';

const AdminPanel: React.FC = () => {
  const { products, updateProduct, deleteProduct, addProduct } = useProducts();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory'>('dashboard');
  
  // --- Inventory State ---
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [filter, setFilter] = useState('');

  // --- Dashboard Logic ---
  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const totalStockCount = products.reduce((acc, p) => acc + p.stock, 0);
    const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
    const outOfStock = products.filter(p => p.stock === 0);
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= 3);
    
    // Categorías con más stock (simple análisis)
    const stockByCategory: {[key: string]: number} = {};
    products.forEach(p => {
        stockByCategory[p.category] = (stockByCategory[p.category] || 0) + p.stock;
    });

    return { totalProducts, totalStockCount, totalValue, outOfStock, lowStock, stockByCategory };
  }, [products]);

  // --- Inventory Functions ---
  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm(product);
    setIsAdding(false);
    setNewGalleryUrl('');
  };

  const startAdd = () => {
    setEditingId('NEW');
    setEditForm({
      name: '',
      price: 0,
      stock: 5,
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400',
      category: CATEGORIES[0].name,
      subcategory: CATEGORIES[0].groups[0].items[0],
      gallery: []
    });
    setIsAdding(true);
    setNewGalleryUrl('');
  };

  const saveEdit = () => {
    if (isAdding) {
      if (editForm.name && editForm.price && editForm.category) {
        addProduct({
          ...editForm,
          id: Date.now().toString(),
          category: editForm.category || 'MOTO',
          subcategory: editForm.subcategory || 'Otros',
          name: editForm.name || 'Nuevo Producto',
          price: editForm.price || 0,
          stock: editForm.stock || 0,
          image: editForm.image || '',
          gallery: editForm.gallery || []
        } as Product);
      }
    } else if (editingId && editForm) {
      updateProduct(editingId, editForm);
    }
    setEditingId(null);
    setEditForm({});
    setIsAdding(false);
    setNewGalleryUrl('');
  };

  const deleteItem = (id: string) => {
      if(window.confirm('¿Estás seguro de eliminar este producto?')) {
          deleteProduct(id);
      }
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) || 
    p.subcategory.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 border-t-4 border-moto-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Tabs */}
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h2>
            <p className="text-gray-500 mb-6">Gestiona tu negocio, inventario y visualiza oportunidades de venta.</p>
            
            <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm w-fit">
                <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                        activeTab === 'dashboard' 
                        ? 'bg-moto-black text-white shadow-md' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    📊 Dashboard
                </button>
                <button
                    onClick={() => setActiveTab('inventory')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                        activeTab === 'inventory' 
                        ? 'bg-moto-black text-white shadow-md' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    📦 Inventario ({products.length})
                </button>
            </div>
        </div>

        {/* DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Valor Inventario</h3>
                            <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <span className="text-3xl font-black text-moto-black">${metrics.totalValue.toLocaleString('es-AR')}</span>
                            <p className="text-xs text-gray-400 mt-1">En {metrics.totalStockCount} unidades</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Sin Stock (Agotados)</h3>
                            <div className="p-2 bg-red-50 rounded-lg text-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.008v.008H12v-.008z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <span className="text-3xl font-black text-red-500">{metrics.outOfStock.length}</span>
                            <p className="text-xs text-red-400 mt-1 font-bold">¡Ventas perdidas potenciales!</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Stock Crítico (≤3)</h3>
                            <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <span className="text-3xl font-black text-yellow-500">{metrics.lowStock.length}</span>
                            <p className="text-xs text-gray-400 mt-1">Reponer pronto</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Productos</h3>
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <span className="text-3xl font-black text-gray-800">{metrics.totalProducts}</span>
                            <p className="text-xs text-gray-400 mt-1">Items en catálogo</p>
                        </div>
                    </div>
                </div>

                {/* Alerts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Out of Stock Alert */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-red-50">
                            <h3 className="font-bold text-red-800 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                Atención: Productos Agotados
                            </h3>
                            <button onClick={() => setActiveTab('inventory')} className="text-xs text-red-600 font-bold hover:underline">Gestionar Stock &rarr;</button>
                        </div>
                        <div className="p-0 flex-1 overflow-y-auto max-h-[300px]">
                            {metrics.outOfStock.length === 0 ? (
                                <div className="p-8 text-center text-gray-400">¡Excelente! No tienes productos agotados.</div>
                            ) : (
                                <table className="min-w-full">
                                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                                        <tr>
                                            <th className="px-6 py-3 text-left">Producto</th>
                                            <th className="px-6 py-3 text-right">Precio Perdido</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {metrics.outOfStock.map(p => (
                                            <tr key={p.id} className="hover:bg-red-50/30">
                                                <td className="px-6 py-3 text-sm text-gray-800 font-medium">{p.name}</td>
                                                <td className="px-6 py-3 text-sm text-right text-gray-500">${p.price.toLocaleString('es-AR')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                    {/* Low Stock Alert */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-yellow-50">
                            <h3 className="font-bold text-yellow-800 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Alerta: Stock Bajo (Reponer)
                            </h3>
                            <button onClick={() => setActiveTab('inventory')} className="text-xs text-yellow-700 font-bold hover:underline">Gestionar Stock &rarr;</button>
                        </div>
                        <div className="p-0 flex-1 overflow-y-auto max-h-[300px]">
                            {metrics.lowStock.length === 0 ? (
                                <div className="p-8 text-center text-gray-400">Todo el inventario tiene niveles saludables.</div>
                            ) : (
                                <table className="min-w-full">
                                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                                        <tr>
                                            <th className="px-6 py-3 text-left">Producto</th>
                                            <th className="px-6 py-3 text-center">Stock Actual</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {metrics.lowStock.map(p => (
                                            <tr key={p.id} className="hover:bg-yellow-50/30">
                                                <td className="px-6 py-3 text-sm text-gray-800 font-medium">{p.name}</td>
                                                <td className="px-6 py-3 text-center">
                                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                                                        {p.stock} un.
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* INVENTORY TABLE VIEW */}
        {activeTab === 'inventory' && (
            <div className="bg-white rounded-xl shadow overflow-hidden animate-fade-in">
              {/* Inventory Toolbar */}
              <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between bg-gray-50">
                 <input 
                    type="text" 
                    placeholder="Buscar por nombre o subcategoría..." 
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-moto-green outline-none w-full md:w-96"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                 />
                 <button 
                    onClick={startAdd}
                    className="bg-moto-green text-white px-6 py-2 rounded-lg font-bold hover:bg-moto-greenDark transition-colors flex items-center gap-2 whitespace-nowrap justify-center shadow-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Nuevo Producto
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/3">Producto</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Categoría</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Precio</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Add Row Form if active */}
                    {isAdding && (
                       <tr className="bg-green-50 animate-fade-in border-l-4 border-moto-green">
                          <td className="px-6 py-4">
                              <input 
                                type="text" 
                                placeholder="Nombre del producto"
                                value={editForm.name} 
                                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                className="w-full border rounded px-2 py-1 text-sm mb-2"
                              />
                               <div className="flex items-center gap-2 mb-2">
                                 <input 
                                   type="text"
                                   placeholder="URL Imagen Principal"
                                   value={editForm.image}
                                   onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                                   className="text-xs border rounded px-2 py-1 w-full"
                                 />
                               </div>
                          </td>
                          <td className="px-6 py-4 align-top">
                               <select 
                                value={editForm.category} 
                                onChange={(e) => {
                                    setEditForm({...editForm, category: e.target.value, subcategory: ''})
                                }}
                                className="w-full border rounded px-2 py-1 text-sm mb-2"
                               >
                                 {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                               </select>
                               <select 
                                value={editForm.subcategory}
                                onChange={(e) => setEditForm({...editForm, subcategory: e.target.value})}
                                className="w-full border rounded px-2 py-1 text-sm"
                               >
                                 <option value="">Seleccionar</option>
                                 {CATEGORIES.find(c => c.name === editForm.category)?.groups.flatMap(g => g.items).map(s => (
                                   <option key={s} value={s}>{s}</option>
                                 ))}
                               </select>
                          </td>
                          <td className="px-6 py-4 align-top">
                            <input 
                              type="number" 
                              value={editForm.stock} 
                              onChange={(e) => setEditForm({...editForm, stock: Number(e.target.value)})}
                              className="w-20 border rounded px-2 py-1 text-sm"
                              min="0"
                            />
                          </td>
                          <td className="px-6 py-4 align-top">
                            <input 
                              type="number" 
                              value={editForm.price} 
                              onChange={(e) => setEditForm({...editForm, price: Number(e.target.value)})}
                              className="w-24 border rounded px-2 py-1 text-sm"
                            />
                          </td>
                          <td className="px-6 py-4 text-sm font-medium space-x-2 align-top">
                              <button onClick={saveEdit} className="text-green-600 hover:text-green-900 font-bold bg-green-100 px-2 py-1 rounded">Crear</button>
                              <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-red-600 hover:text-red-900">Cancelar</button>
                          </td>
                       </tr>
                    )}

                    {filteredProducts.slice(0, 50).map((product) => (
                      <tr key={product.id} className={editingId === product.id ? "bg-blue-50" : "hover:bg-gray-50"}>
                        {editingId === product.id ? (
                          // EDIT MODE
                          <>
                            <td className="px-6 py-4">
                              <div className="space-y-3">
                                <input 
                                  type="text" 
                                  value={editForm.name} 
                                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                  className="w-full border rounded px-2 py-1 text-sm"
                                />
                                <div className="flex items-center gap-2">
                                  <img src={editForm.image} alt="preview" className="h-10 w-10 object-cover rounded" />
                                  <div className="flex flex-col gap-1 w-full">
                                    <input 
                                      type="text"
                                      placeholder="URL de imagen"
                                      value={editForm.image}
                                      onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                                      className="text-xs border rounded px-2 py-1 w-full"
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 align-top">
                               <div className="text-xs text-gray-500 mb-1">Categoría</div>
                               <select 
                                value={editForm.category} 
                                onChange={(e) => {
                                    setEditForm({...editForm, category: e.target.value, subcategory: ''})
                                }}
                                className="w-full border rounded px-2 py-1 text-sm mb-2"
                               >
                                 {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                               </select>
                               <div className="text-xs text-gray-500 mb-1">Subcategoría</div>
                               <select 
                                value={editForm.subcategory}
                                onChange={(e) => setEditForm({...editForm, subcategory: e.target.value})}
                                className="w-full border rounded px-2 py-1 text-sm"
                               >
                                 <option value="">Seleccionar</option>
                                 {CATEGORIES.find(c => c.name === editForm.category)?.groups.flatMap(g => g.items).map(s => (
                                   <option key={s} value={s}>{s}</option>
                                 ))}
                               </select>
                            </td>
                            <td className="px-6 py-4 align-top">
                              <label className="text-xs text-gray-500 block">Unidades</label>
                              <input 
                                type="number" 
                                value={editForm.stock} 
                                onChange={(e) => setEditForm({...editForm, stock: Number(e.target.value)})}
                                className="w-20 border rounded px-2 py-1 text-sm font-bold"
                                min="0"
                              />
                            </td>
                            <td className="px-6 py-4 align-top">
                              <label className="text-xs text-gray-500 block">ARS $</label>
                              <input 
                                type="number" 
                                value={editForm.price} 
                                onChange={(e) => setEditForm({...editForm, price: Number(e.target.value)})}
                                className="w-24 border rounded px-2 py-1 text-sm"
                              />
                            </td>
                            <td className="px-6 py-4 text-sm font-medium space-x-2 align-top">
                              <button onClick={saveEdit} className="text-green-600 hover:text-green-900 font-bold bg-green-100 px-3 py-1 rounded">Guardar</button>
                              <button onClick={() => setEditingId(null)} className="text-gray-600 hover:text-gray-900">Cancelar</button>
                            </td>
                          </>
                        ) : (
                          // VIEW MODE
                          <>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-12 w-12 relative">
                                  <img className="h-12 w-12 rounded-lg object-cover bg-gray-100" src={product.image} alt="" />
                                  {product.stock === 0 && (
                                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                                        <span className="text-[8px] text-white font-bold bg-red-600 px-1 rounded">AGOTADO</span>
                                    </div>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 line-clamp-2 max-w-[200px]" title={product.name}>{product.name}</div>
                                  <div className="text-xs text-gray-500">{product.compatibleBrands?.join(', ')}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{product.category}</div>
                              <div className="text-xs text-gray-500">{product.subcategory}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                product.stock > 5 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {product.stock} un.
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${product.price.toLocaleString('es-AR')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                              <button onClick={() => startEdit(product)} className="text-indigo-600 hover:text-indigo-900 font-medium">Editar</button>
                              <button onClick={() => deleteItem(product.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredProducts.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No se encontraron productos con el filtro actual.
                    </div>
                )}
              </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;