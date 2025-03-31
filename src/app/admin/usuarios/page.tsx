"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function GerenciarUsuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/admin/usuarios");
        
        if (!response.ok) {
          throw new Error("Erro ao carregar usuários");
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Não foi possível carregar a lista de usuários");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchUsers();
  }, []);

  async function promoverUsuario(userId: string) {
    try {
      const response = await fetch(`/api/admin/usuarios/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "ADMIN" }),
      });
      
      if (!response.ok) {
        throw new Error("Falha ao promover usuário");
      }
      
      // Atualiza a lista de usuários
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, role: "ADMIN" } 
          : user
      ));
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar permissões do usuário");
    }
  }

  async function rebaixarUsuario(userId: string) {
    try {
      const response = await fetch(`/api/admin/usuarios/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "USER" }),
      });
      
      if (!response.ok) {
        throw new Error("Falha ao rebaixar usuário");
      }
      
      // Atualiza a lista de usuários
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, role: "USER" } 
          : user
      ));
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar permissões do usuário");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gerenciar Usuários</h1>
          <p className="text-gray-600">
            Adicione, edite, remova e atualize permissões de usuários.
          </p>
        </div>
        <Link
          href="/admin"
          className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          Voltar ao Painel
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12">
          <p>Carregando usuários...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Função
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data de Registro
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name || "Sem nome"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === "ADMIN" 
                        ? "bg-purple-100 text-purple-800" 
                        : "bg-green-100 text-green-800"
                    }`}>
                      {user.role === "ADMIN" ? "Administrador" : "Usuário"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {user.role === "USER" ? (
                      <button
                        onClick={() => promoverUsuario(user.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Promover a Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => rebaixarUsuario(user.id)}
                        className="text-yellow-600 hover:text-yellow-900 mr-4"
                      >
                        Rebaixar a Usuário
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 