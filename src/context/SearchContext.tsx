import { useDisclosure } from '@chakra-ui/react';
import React, {
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UsersProps } from '../models/users';
import { api } from '../services/api';
import { useUsersInfinit } from '../services/hooks/useUsers';

interface SearchProviderProps {
  children: ReactNode;
}

interface SearchContextData {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  search: string;
  setSearch: (newState: string) => void;
  users: UsersProps[] | undefined;
  setUsers: (newState: UsersProps[] | undefined) => void;
  loadingSearch: boolean;
  setLoadingSearch: (newState: boolean) => void;
  requestUsersError: boolean;
  setRequestUsersError: (newState: boolean) => void;
  data: UsersProps[] | undefined | any;
  isLoading: boolean;
  error: unknown;
  handleSearch: (event: FormEvent) => void;
}

const SearchContext = createContext({} as SearchContextData);

export function SearchProvider({ children }: SearchProviderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<UsersProps[] | undefined | any>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [requestUsersError, setRequestUsersError] = useState(false);

  const { data, isLoading, error } = useUsersInfinit();

  useEffect(() => {
    setUsers(data?.pages.flat());
  }, [data]);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    setLoadingSearch(true);
    try {
      const response = await api.get(`/users?name_like=${search}`);
      setUsers(response.data);
      setRequestUsersError(false);
    } catch (err) {
      setRequestUsersError(true);
      console.log(err);
    } finally {
      setLoadingSearch(false);
    }
  }

  const searchValues = {
    isOpen,
    onOpen,
    onClose,
    search,
    setSearch,
    users,
    setUsers,
    loadingSearch,
    setLoadingSearch,
    requestUsersError,
    setRequestUsersError,
    data,
    isLoading,
    error,
    handleSearch,
  };

  return (
    <SearchContext.Provider value={searchValues}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
