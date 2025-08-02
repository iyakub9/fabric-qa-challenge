import { APIRequestContext, expect } from '@playwright/test';

export async function searchTransactionsByAmount(apiContext: APIRequestContext, accountId: string, amount: string) {
    return await apiContext.get(`/parabank/services_proxy/bank/accounts/${accountId}/transactions/amount/${amount}`);
}

export async function verifySearchTransactionsByAmount(apiContext: APIRequestContext, accountId: string, amount: string) {
    const response = await searchTransactionsByAmount(apiContext, accountId, amount);
    expect(response.ok(), `Request failed with status ${response.status()}`).toBeTruthy();

    const body = await response.text();

    expect(body).toContain(`"accountId":${accountId}`);
    expect(body).toContain(`"amount":${amount}`);

    return body;
}