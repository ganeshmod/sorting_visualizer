/**
 * Heap Sort Implementation
 *
 * Algorithm:
 *   Uses a Binary Max-Heap data structure. First builds a max-heap from
 *   the input array, then repeatedly extracts the maximum element (root)
 *   and places it at the end of the array, shrinking the heap each time.
 *
 * Phase 1 — Build Max-Heap:
 *   Start from the last non-leaf node and heapify down to root.
 *   After this phase, arr[0] is the largest element.
 *
 * Phase 2 — Extract Elements:
 *   Swap root (max) with last element, reduce heap size, heapify root.
 *   Repeat until heap is empty → array is sorted.
 *
 * Time Complexity:
 *   - Best:    O(n log n)
 *   - Average: O(n log n)
 *   - Worst:   O(n log n) — consistent performance
 *
 * Space Complexity: O(1) — in-place, uses the input array as the heap
 *
 * Stable: NO — non-adjacent swaps during heapify can change relative order
 */
public class HeapSort {

    /**
     * Sorts an integer array using Heap Sort.
     *
     * @param arr the array to be sorted (modified in-place)
     */
    public static void heapSort(int[] arr) {
        int n = arr.length;

        // Phase 1: Build max-heap
        // Start from last non-leaf node (index n/2 - 1) and heapify down
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        // Phase 2: Extract elements from heap one by one
        for (int i = n - 1; i > 0; i--) {
            // Move current root (maximum) to the end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            // Heapify the reduced heap (size = i, root = 0)
            heapify(arr, i, 0);
        }
    }

    /**
     * Heapify a subtree rooted at index i in an array of size n.
     * Ensures the max-heap property: parent >= children.
     *
     * @param arr  the array representing the heap
     * @param n    the size of the heap (not the full array)
     * @param i    the root index of the subtree to heapify
     */
    private static void heapify(int[] arr, int n, int i) {
        int largest = i;       // Assume root is largest
        int left = 2 * i + 1;  // Left child index
        int right = 2 * i + 2; // Right child index

        // If left child exists and is greater than root
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        // If right child exists and is greater than current largest
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        // If largest is not the root, swap and continue heapifying down
        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;

            // Recursively heapify the affected subtree
            heapify(arr, n, largest);
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
        int[] arr = {12, 11, 13, 5, 6, 7, 99, 2};

        System.out.println("=== Heap Sort ===");
        System.out.println("Time Complexity  : Best O(n log n) | Average O(n log n) | Worst O(n log n)");
        System.out.println("Space Complexity : O(1) — In-place");
        System.out.println("Stable           : No");
        System.out.println();
        System.out.print("Before sorting: ");
        printArray(arr);

        heapSort(arr);

        System.out.print("After sorting:  ");
        printArray(arr);
    }
}
