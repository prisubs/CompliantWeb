import indicoio

if __name__ == "__main__":
    print(indicoio.sentiment('This sentence is awful. This sentence is great!', split='sentence'))