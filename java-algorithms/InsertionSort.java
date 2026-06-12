/**
 * Insertion Sort Implementation
 *
 * Algorithm:
 *   Builds the sorted array one element at a time. Picks each element
 *   and inserts it into its correct position in the already-sorted portion
 *   of the array — similar to sorting playing cards in your hand.
 *
 * Time Complexity:
 *   - Best:    O(n)   — array is already sorted
 *   - Average: O(n²)
 *   - Worst:   O(n²)  — array is reverse-sorted
 *
 * Space Complexity: O(1) — in-place sorting
 *
 * Stable: YES — equal elements maintain their relative order
 */
public class InsertionSort {

    /**
     * Sorts an integer array using the Insertion Sort algorithm.
     *
     * @param arr the array to be sorted (modified in-place)
     */
    public static void insertionSort(int[] arr) {
        int n = arr.length;

        for (int i = 1; i < n; i++) {
            int key = arr[i]; // The element to be inserted
            int j = i - 1;

            // Shift elements of arr[0..i-1] that are greater than key
            // one position ahead to make room for key
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }

            // Place key in its correct sorted position
            arr[j + 1] = key;
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
        int[] arr = {12, 11, 13, 5, 6, 78, 3};

        System.out.println("=== Insertion Sort ===");
        System.out.println("Time Complexity  : Best O(n) | Average O(n²) | Worst O(n²)");
        System.out.println("Space Complexity : O(1) — In-place");
        System.out.println("Stable           : Yes");
        System.out.println();
        System.out.print("Before sorting: ");
        printArray(arr);

        insertionSort(arr);

        System.out.print("After sorting:  ");
        printArray(arr);
    }
}
