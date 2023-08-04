import { useQuery } from '@tanstack/react-query';
import { IUsers } from './Types';
import request from 'graphql-request';
import gql from 'graphql-tag';

const queryusers = gql(`
query usu {
  GetUsers (Mostrar_update: ""){
    id
    name
    lastname
    email
    createdAt
  }
}
`) 

function App() {

// const {data} = AllUsers();
const {data, isLoading} = useQuery<IUsers[]>({
  queryKey: ['user'],
  queryFn: async () =>
  request(
    'http://localhost:3000/graphql',
    queryusers,
  )
});

if (isLoading) {
  return <div>Loading...</div>;
}


console.log(data);

  return (
    <>
      <div className=' bg-zinc-800 h-screen text-white flex items-center justify-center'>
        <div className=' bg-zinc-900 p-4 w-2/3'>
          <h1 className=' text-3xl font-bold text-center block my-2'> Lista de Usuarios</h1>
            <div className=' p-2 w-full overflow-x-auto'>
            <table className=' min-w-full divide-y divide-gray-900'>
        <thead className=' bg-gray-500'>
          <tr>
            <th scope='col' className=' px-6 py-3 text-left text-xs font-medium text-gray-150 uppercase tracking-wider'>Id</th>
            <th scope='col' className=' px-6 py-3 text-left text-xs font-medium text-gray-150 uppercase tracking-wider'>Name</th>
            <th scope='col' className=' px-6 py-3 text-left text-xs font-medium text-gray-150 uppercase tracking-wider'>Lastname</th>
            <th scope='col' className=' px-6 py-3 text-left text-xs font-medium text-gray-150 uppercase tracking-wider'>Email</th>
          </tr>
        </thead>
        <tbody className=' bg-zinc-950 divide-y divide-gray-200'>
        {data && data.GetUsers.map((usu: IUsers) => (
        <tr key={usu.id}>
          <td className=' px-6 py-4 whitespace-nowrap'>{usu.id}</td>
          <td className=' px-6 py-4 whitespace-nowrap'>{usu.name}</td>
          <td className=' px-6 py-4 whitespace-nowrap'>{usu.lastname}</td>
          <td className=' px-6 py-4 whitespace-nowrap'>{usu.email}</td>
        </tr>
      ))}
        </tbody>
      </table>
            </div>
      </div>
      </div>
    </>
  )
}

export default App
