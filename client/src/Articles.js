import React, { useEffect, useState } from 'react';
import api from './api';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', author: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingForm, setEditingForm] = useState({ title: '', content: '', author: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    setLoading(true);
    try {
      const res = await api.get('/api/articles');
      setArticles(res.data || []);
      setError(null);
    } catch (err) {
      setError('Gagal mengambil artikel');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post('/api/articles', form);
      setArticles(prev => [res.data, ...prev]);
      setForm({ title: '', content: '', author: '' });
    } catch (err) {
      console.error(err);
      setError('Gagal menambahkan artikel');
    }
  }

  // delete artikel
  async function handleDelete(id) {
    if (!window.confirm('Yakin ingin menghapus artikel ini?')) return;
    try {
      await api.delete(`/api/articles/${id}`);
      setArticles(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      console.error(err);
      setError('Gagal menghapus artikel');
    }
  }

  // mulai edit
  function startEdit(article) {
    setEditingId(article._id);
    setEditingForm({ title: article.title, content: article.content, author: article.author });
  }

  // cancel edit
  function cancelEdit() {
    setEditingId(null);
    setEditingForm({ title: '', content: '', author: '' });
  }

  // submit edit
  async function submitEdit(e) {
    e.preventDefault();
    try {
      const res = await api.put(`/api/articles/${editingId}`, editingForm);
      setArticles(prev => prev.map(a => (a._id === editingId ? res.data : a)));
      cancelEdit();
    } catch (err) {
      console.error(err);
      setError('Gagal mengupdate artikel');
    }
  }

  return (
    <div className="space-y-8">
      {/* Form untuk artikel baru */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Buat Artikel Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Judul artikel..."
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Isi artikel..."
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              rows={6}
              required
            />
          </div>
          <div>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nama penulis (opsional)"
              value={form.author}
              onChange={e => setForm({ ...form, author: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Simpan Artikel
          </button>
        </form>
      </section>

      {/* Daftar artikel */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Daftar Artikel</h2>
        
        {/* Loading dan error states */}
        {loading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-md mb-4">
            {error}
          </div>
        )}
        {!loading && articles.length === 0 && (
          <p className="text-gray-500 text-center py-4">Belum ada artikel. Yuk mulai menulis! 📝</p>
        )}
        
        {/* List artikel */}
        <ul className="divide-y divide-gray-200">
          {articles.map(a => (
            <li key={a._id} className="py-6 first:pt-0 last:pb-0">
              {editingId === a._id ? (
                <form onSubmit={submitEdit} className="space-y-4">
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={editingForm.title}
                    onChange={e => setEditingForm({...editingForm, title: e.target.value})}
                    required
                  />
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={editingForm.content}
                    onChange={e => setEditingForm({...editingForm, content: e.target.value})}
                    rows={4}
                    required
                  />
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={editingForm.author}
                    onChange={e => setEditingForm({...editingForm, author: e.target.value})}
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Simpan
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              ) : (
                <article className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">{a.title}</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{a.content}</p>
                  <div className="flex items-center justify-between">
                    <small className="text-gray-500">
                      Oleh: {a.author || 'Anonymous'} — {new Date(a.createdAt).toLocaleString()}
                    </small>
                    <div className="flex gap-3">
                      <button
                        onClick={() => startEdit(a)}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(a._id)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </article>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
