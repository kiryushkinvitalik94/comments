interface Api {
  get: (path: string) => void;
}

export default class ApiBuilder implements Api {
  private cache: Map<string, any> = new Map();

  get<ReturnData>(path) {
    return async (): Promise<ReturnData> => {
      if (this.cache.has(path)) {
        return this.cache.get(path);
      }
      try {
        const response = await fetch(path);
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
        const json = await response.json();
        this.cache.set(path, json);
        return json;
      } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
      }
    };
  }
  post<requestDataType, ReturnData>(path) {
    return async (requestData: requestDataType): Promise<ReturnData> => {
      try {
        const response = await fetch(path, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
          method: "POST",
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        // After adding a new comment, remove the cached data for this path
        this.cache.delete(path);

        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`Error adding comment: ${error}`);
      }
    };
  }
  delete<requestDataType, ReturnData>(path) {
    return async (id: requestDataType): Promise<ReturnData> => {
      const requestPath = `${path}${id ? `/${id}` : ""}`;
      try {
        const response = await fetch(requestPath, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        // After deleting a comment, remove the cached data for this path
        this.cache.delete(requestPath);

        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`Error deleting comment: ${error}`);
      }
    };
  }
  put<requestDataType, ReturnData>(path) {
    return async (
      requestData: requestDataType,
      id?: number
    ): Promise<ReturnData> => {
      const requestPath = `${path}${id ? `/${id}` : ""}`;
      try {
        const response = await fetch(requestPath, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        // After updating a comment, remove the cached data for this path
        this.cache.delete(requestPath);

        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`Error deleting comment: ${error}`);
      }
    };
  }
}
