/**
 * Bubble Sort Implementation
 *
 * Algorithm:
 *   Repeatedly steps through the list, compares adjacent elements,
 *   and swaps them if they are in the wrong order. Each pass "bubbles up"
 *   the largest unsorted element to its correct position.
 *
 * Time Complexity:
 *   - Best:    O(n)     — already sorted, with optimized flag
 *   - Average: O(n²)
 *   - Worst:   O(n²)   — reverse-sorted input
 *
 * Space Complexity: O(1) — in-place sorting, no extra memory needed
 *
 * Stable: YES — equal elements maintain their relative order
 */
public class BubbleSort {

    /**
     * Sorts an integer array using the Bubble Sort algorithm.
     * Uses an optimized version with an early-exit flag.
     *
     * @param arr the array to be sorted (modified in-place)
     */
    public static void bubbleSort(int[] arr) {
        int n = arr.length;

        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false; // Optimization: stop early if no swaps in a pass

            // Last i elements are already in place
            for (int j = 0; j < n - i - 1; j++) {
                // Compare adjacent elements
                if (arr[j] > arr[j + 1]) {
                    // Swap arr[j] and arr[j+1]
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }

            // If no swaps occurred, array is already sorted
            if (!swapped) break;
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
        int[] arr = {64, 34, 25, 12, 22, 11, 90};

        System.out.println("=== Bubble Sort ===");
        System.out.println("Time Complexity  : Best O(n) | Average O(n²) | Worst O(n²)");
        System.out.println("Space Complexity : O(1) — In-place");
        System.out.println("Stable           : Yes");
        System.out.println();
        System.out.print("Before sorting: ");
        printArray(arr);

        bubbleSort(arr);

        System.out.print("After sorting:  ");
        printArray(arr);
    }
}
