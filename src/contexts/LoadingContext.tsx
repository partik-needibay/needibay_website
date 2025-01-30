"use client"
import { createContext, useContext } from 'react';

const LoadingContext = createContext(null);

export function useLoading() {
  return useContext(LoadingContext);
}