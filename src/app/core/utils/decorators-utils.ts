export function hasMarvelServiceAndHandlingProperties(context: any): boolean {
  return (
    context.hasOwnProperty('marvelService') &&
    context['marvelService'].hasOwnProperty('marvelHandlingService')
  );
}
