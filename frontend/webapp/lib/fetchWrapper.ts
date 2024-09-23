/* eslint-disable @typescript-eslint/ban-types */
//import { getTokenWorkaround } from "@/app/actions/authActions";

import { auth } from "@/auth";
import { headers } from "next/headers";

const baseUrl = "http://localhost:6001/";

async function get(url: string) {
  const requestOptions = {
    method: "GET",
    header: await getHeaders(),
  };

  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
}

async function post(url: string, body: {}) {
  const requestOptions = {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
}

async function put(url: string, body: {}) {
  const requestOptions = {
    method: "PUT",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
}

async function del(url: string) {
  const requestOptions = {
    method: "DELETE",
    headers: await getHeaders(),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
}

async function getHeaders() {
  //const token = await getTokenWorkaround();
  const session = await auth();
  const token = session?.accessToken;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headers = { "Content-type": "application/json" } as any;
  if (token) {
    headers.Authorization = "Bearer " + session.accessToken;
  }
  return headers;
}

async function handleResponse(response: Response) {
  const text = await response.text();
  const data = text && JSON.parse(text);

  if (response.ok) {
    return data || response.statusText;
  } else {
    const error = {
      status: response.status,
      message: response.statusText,
    };
    console.log(error);
    return { error };
  }
}

export const fetchWrapper = {
  get,
  post,
  put,
  del,
};
