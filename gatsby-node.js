// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.com/docs/node-apis/
//  */

// // You can delete this file if you're not using it

// exports.createPages = async ({ actions: { createPage } }) => {
//   // `getPokemonData` is a function that fetches our data
//   const allPokemon = await getPokemonData(["pikachu", "charizard", "squirtle"])

//   // Create a page that lists all Pokémon.
//   createPage({
//     path: `/`,
//     component: require.resolve("./src/templates/all-pokemon.js"),
//     context: { allPokemon },
//   })

//   // Create a page for each Pokémon.
//   allPokemon.forEach(pokemon => {
//     createPage({
//       path: `/pokemon/${pokemon.name}/`,
//       component: require.resolve("./src/templates/pokemon.js"),
//       context: { pokemon },
//     })
//   })
// }
