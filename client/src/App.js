import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContent, setContext } from '@apollo/client/link/context';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home'; 
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

import { isAuth } from './utils/auth';



const httpLink = createHttpLink({
  uri: '/graphql',
  onError: ({ operation, response, graphQLErrors, networkError }) => {
    console.log('Request', operation);
    console.log('Response', response);
    console.log('GraphQL Errors', graphQLErrors);
    console.log('Network Error', networkError);
  },
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header></Header>
        
        <Routes>
        {/* <Route path='/Home' element={<Home/>} /> */}
          {/*<Route path='/Forum' element={<Forum/>} />*/}
          <Route path='/Login' element={<Login/>} />
          <Route path='/Signup' element={<Signup/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/Profile' element={<Profile/>} />
        </Routes>
        
        <Footer></Footer>
      </Router>
      </ApolloProvider>
  );
}

export default App;
