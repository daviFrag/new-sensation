'use client'

import { CustomUserProvider, useCustomUserContext } from "@/app/context/userStore";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export type WithPageAuthorizedOptions = {
  returnTo?: string;
  permissions?: string[]
}

export type WithPageAuthorized = (
  Component: (props: any) => React.ReactNode,
  options?: WithPageAuthorizedOptions
) => ((props: any) => ReactNode)

type LoadUserComponentProps = {
  options?: WithPageAuthorizedOptions,
  children?: ReactNode
}

function LoadUserComponent({options = {}, children}: LoadUserComponentProps) {
  const {returnTo, permissions} = options;
  const {user,isLoading} = useCustomUserContext();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return redirect(returnTo ?? "/")
  }

  permissions?.forEach((permission) => {if (!user.permissions.includes(permission)) {
    // TODO: set option to custom redirect url
    redirect("/");
  }})

  return (
    <>
      {children}
    </>
  )
}

export const withPageAuthorized : WithPageAuthorized = (Component, options = {}) => {
  return function WithPageAuthorized (props: any) : React.ReactNode {

    return (
      <CustomUserProvider>
        <LoadUserComponent options={options}>
           <Component {...props} />
        </LoadUserComponent>
      </CustomUserProvider>
    )
  }
  
}