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
    const lowerSearchString = replaceSpecialChars(searchString.toLowerCase());

    setGlossaryItems(
      allGlossaryItems.filter(
        (glossaryItem) =>
          replaceSpecialChars(glossaryItem.transliteration).includes(lowerSearchString) ||
          glossaryItem.english.includes(lowerSearchString)
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

function replaceSpecialChars(s: string) {
  const charMap: { [key: string]: string } = {
    à: 'a',
    á: 'a',
    â: 'a',
    ǎ: 'a',
    è: 'e',
    é: 'e',
    ê: 'e',
    ě: 'e',
    ì: 'i',
    í: 'i',
    î: 'i',
    ǐ: 'i',
    ò: 'o',
    ó: 'o',
    ô: 'o',
    ǒ: 'o',
    ù: 'u',
    ú: 'u',
    û: 'u',
    ǔ: 'u',
    ɛ̀: 'e',
    ɛ́: 'e',
    ɛ̂: 'e',
    ɛ̌: 'e',
    ə̀: 'e',
    ə́: 'e',
    ə̂: 'e',
    ə̌: 'e',
    ɔ̀: 'o',
    ɔ́: 'o',
    ɔ̂: 'o',
    ɔ̌: 'o',
    ʉ̀: 'u',
    ʉ́: 'u',
    ʉ̂: 'u',
    ʉ̌: 'u',
  };

  s = s.toLowerCase();

  return s
    .split('')
    .map((char) => charMap[char] || char)
    .join('');
}
