class GTM {
  public static pushEvent(event: string, data: Record<string, unknown> = { value: null }): void {
    // @ts-expect-error: dataLayer is a global variable
    window.dataLayer.push({
      event,
      ...data,
    });
  }
}

export default GTM;
