// =============================================================================
// Test data (the Maestro equivalent of an Appium JSON data file)
// =============================================================================
// Maestro's JS sandbox cannot open files, so the JSON lives in a .js file and is
// assigned to `output`, which is shared by every flow and subflow in the run.
//
// Select a dataset from the command line:
//   maestro test -e DATASET=austria_female .
//
// Access it in any flow after `runScript: data/testdata.js`:
//   ${output.data.user.country}
//   ${output.data.products[0].name}
// =============================================================================

var datasets = {

  default: {
    // Albania is on the first page of the dropdown, so scrollUntilVisible finds
    // it without scrolling. A country deeper in the alphabet (e.g. Egypt) costs
    // ~30s per run, because every scroll step re-reads the view hierarchy.
    user: { country: "Albania", name: "Ahmed", gender: "Male" },
    products: [
      { name: "Air Jordan 4 Retro" },
      { name: "Air Jordan 1 Mid SE" }
    ],
    optInToEmails: true,
    searchQuery: "General Store"
  },

  austria_female: {
    user: { country: "Austria", name: "Maria", gender: "Female" },
    products: [
      { name: "Air Jordan 1 Mid SE" }
    ],
    optInToEmails: false,
    searchQuery: "Maestro mobile testing"
  }
};

// DATASET comes from the flow's env (default "default") or the CLI -e flag
var key = (typeof DATASET !== "undefined" && DATASET) ? DATASET : "default";

if (!datasets[key]) {
  throw new Error('Unknown DATASET "' + key + '". Available: ' + Object.keys(datasets).join(", "));
}

output.data = datasets[key];

// Scratch space that subflows fill in while the test runs
output.cart = { prices: [], total: null };
