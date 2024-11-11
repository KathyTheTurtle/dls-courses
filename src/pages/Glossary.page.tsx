import { useEffect, useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Center, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import data from '../data.json';
import { GlossaryItem } from '../types';

let allGlossaryItems: GlossaryItem[] = [];

export function GlossaryPage() {
  const [glossaryItems, setGlossaryItems] = useState<GlossaryItem[]>([]);
  const [searchString, setSearchString] = useInputState('');

  const { courseId } = useParams();

  useEffect(() => {
    const course = data.courses.find((course) => course.id === courseId);
    if (course) {
      const glossaryItems = course.chapters.flatMap((chapter) => [
        ...chapter.coreVocab.map((coreVocab) => ({
          ...coreVocab,
          chapter: chapter.name,
        })),
        ...(chapter.vocabBuilder?.map((vocabBuilder) => ({
          ...vocabBuilder,
          chapter: chapter.name,
        })) || []),
      ]);
      glossaryItems.sort((a, b) => (a.transliteration < b.transliteration ? -1 : 1));
      allGlossaryItems = glossaryItems;
      setGlossaryItems(allGlossaryItems);
    }
  }, [courseId]);

  useEffect(() => {
    setGlossaryItems(
      allGlossaryItems.filter(
        (glossaryItem) =>
          glossaryItem.transliteration.includes(searchString) ||
          glossaryItem.english.includes(searchString)
      )
    );
  }, [searchString]);

  return (
    <Center>
      <Stack>
        <Group justify="center">
          <Button variant="default" component={Link} to="./.." mt="lg">
            Back
          </Button>
        </Group>
        <Group justify="center">
          <Title>Glossary</Title>
        </Group>
        <TextInput
          placeholder="Search vocab"
          leftSection={<IconSearch />}
          value={searchString}
          onChange={(event) => setSearchString(event.currentTarget.value)}
        />
        {glossaryItems.map((glossaryItem) => (
          <Card withBorder>
            <Center>
              <Text size="xl" fw={700}>
                {glossaryItem.transliteration}
              </Text>
            </Center>
            <Text>{glossaryItem.english}</Text>
            <Text size="sm" c="dimmed">
              {glossaryItem.chapter}
            </Text>
          </Card>
        ))}
      </Stack>
    </Center>
  );
}
