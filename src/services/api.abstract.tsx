import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

abstract class ApiService {
  protected readonly instance: AxiosInstance;
  private basePath: string;

  public constructor(baseURL: string, basePath: string = "") {
    this.basePath = basePath;

    this.instance = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  private _handleResponse = ({ data }: AxiosResponse) => data;

  protected _handleError = (error: any) => Promise.reject(error);

  protected get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<T, T>(this.basePath.concat(url), config);
  }
}

export default ApiService;
