/**
 * Selection Sort Implementation
 *
 * Algorithm:
 *   Divides the array into a sorted and unsorted region.
 *   Repeatedly selects the minimum element from the unsorted region
 *   and moves it to the end of the sorted region.
 *
 * Time Complexity:
 *   - Best:    O(n²) — always performs the same number of comparisons
 *   - Average: O(n²)
 *   - Worst:   O(n²)
 *
 * Space Complexity: O(1) — in-place sorting
 *
 * Stable: NO — swapping non-adjacent elements can change relative order
 *              of equal elements
 */
public class SelectionSort {

    /**
     * Sorts an integer array using the Selection Sort algorithm.
     *
     * @param arr the array to be sorted (modified in-place)
     */
    public static void selectionSort(int[] arr) {
        int n = arr.length;

        for (int i = 0; i < n - 1; i++) {
            // Find the index of the minimum element in the unsorted portion
            int minIndex = i;

            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j; // Track the new minimum
                }
            }

            // Swap the found minimum with the first element of unsorted region
            if (minIndex != i) {
                int temp = arr[minIndex];
                arr[minIndex] = arr[i];
                arr[i] = temp;
            }
        }
    }

    /**
     * Utility method to print array contents.
     *
     * @param arr the array to print
     */
    public static void printArray(int[] arr) {
        System.out.print("[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
            if (i < arr.length - 1) System.out.print(", ");
        }
        System.out.println("]");
    }

    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11, 90, 45};

        System.out.println("=== Selection Sort ===");
        System.out.println("Time Complexity  : Best O(n²) | Average O(n²) | Worst O(n²)");
        System.out.println("Space Complexity : O(1) — In-place");
        System.out.println("Stable           : No");
        System.out.println();
        System.out.print("Before sorting: ");
        printArray(arr);

        selectionSort(arr);

        System.out.print("After sorting:  ");
        printArray(arr);
    }
}
