import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { theme } from './styles/theme';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './services/queryClient';
import { SearchProvider } from './context/SearchContext';
import { DeleteUserProvider } from './context/DeleteUserContext';
import { PostPutUserProvider } from './context/PostPutContext';
import { FormProvider } from './context/FormContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SearchProvider>
          <DeleteUserProvider>
            <PostPutUserProvider>
              <FormProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<App />} />
                    {/* <Route path="*" element={<NotFound />} /> */}
                  </Routes>
                </BrowserRouter>
              </FormProvider>
            </PostPutUserProvider>
          </DeleteUserProvider>
        </SearchProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
